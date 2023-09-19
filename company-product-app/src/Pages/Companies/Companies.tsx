import React, { useState } from 'react';
import { Table, Button, Input, Form, Space, Modal } from 'antd';
import { EditOutlined, DeleteOutlined ,SearchOutlined,ExclamationCircleOutlined} from '@ant-design/icons';

const { Column } = Table;
const { Search } = Input;
const { confirm } = Modal;


//dummy data
const dummyCompanies = [
    {
        key: '1',
        companyName: 'Company A',
        legalNumber: '12345',
        country: 'Country A',
        website: 'www.companya.com',
    },
    {
        key: '2',
        companyName: 'Company B',
        legalNumber: '67890',
        country: 'Country B',
        website: 'www.companyb.com',
    },
];

function Companies() {
    interface Company {
        key: string;
        companyName: string;
        legalNumber: string;
        country: string;
        website: string;
      }
    

    const [companies, setCompanies] = useState<Company[]>(dummyCompanies);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [form] = Form.useForm();

    const handleAddCompany = (values:any) => {
        const newCompany = {
          key: (companies.length + 1).toString(), // Generate a unique key
          ...values,
        };
        setCompanies([...companies, newCompany]);
        form.resetFields();
      };

      const [editingCompany, setEditingCompany] = useState<Company|null>(null);

      const handleEditCompany = (values:any) => {
        if(editingCompany){
            const updatedCompanies = companies.map((company) =>
          company.key === editingCompany.key ? { ...company, ...values } : company
        );
        setCompanies(updatedCompanies);
        setEditingCompany(null);
        form.resetFields();

        }
        
      };

      const showDeleteConfirm = (record:Company) => {
        confirm({
          title: 'Are you sure you want to delete this company?',
          icon: <ExclamationCircleOutlined />,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            handleDeleteCompany(record.key);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

      const handleDeleteCompany = (key:string) => {
        const updatedCompanies = companies.filter((company) => company.key !== key);
        setCompanies(updatedCompanies);
      };

      const handleSearch = (selectedKeys:string[]|null, confirm:(()=>void)|null, dataIndex:string) => {
        if(confirm){
            confirm();
        }
        setSearchText(selectedKeys?selectedKeys[0]:'');
        setSearchedColumn(dataIndex);
      };

      const handleReset = (clearFilters:()=>void) => {
        clearFilters();
        setSearchText('');
      };

      const getColumnSearchProps = (dataIndex:string) => ({
        filterDropdown: ( setSelectedKeys:(selectedKeys:string[])=>{}, selectedKeys:string[], confirm:()=>{}, clearFilters:()=>{} ) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered:boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value:string, record:Company) =>
          record[dataIndex as keyof Company] ? record[dataIndex as keyof Company].toString().toLowerCase().includes(value.toLowerCase()) : '',
        render: (text:string) =>
          searchedColumn === dataIndex ? (
            <Button type="link" onClick={() => handleSearch(null, null, dataIndex)}>
              {text}
            </Button>
          ) : (
            text
          ),
      });

      const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)?([\w-]+\/?)*\??([\w-]+=[\w-]*(\&[\w-]+=[\w-]*)*)?$/;


    return (
        <div>
            <h2>Companies</h2>
            <Space style={{ marginBottom: 16 }}>
                <Search
                    placeholder="Search by company name"
                    allowClear
                    enterButton
                    onSearch={(value) => setSearchText(value)}
                />
            </Space>
            <Table dataSource={companies} size="middle" bordered>
                <Column
                    title="Company Name"
                    dataIndex="companyName"

                    //check here
                    key="companyName"
                    //{...getColumnSearchProps('companyName')}
                />
                <Column title="Legal Number" dataIndex="legalNumber" key="legalNumber" />
                <Column title="Incorporation Country" dataIndex="country" key="country" />
                <Column title="Website" dataIndex="website" key="website" />
                <Column
                    title="Actions"
                    key="actions"
                    render={(_, record:Company) => (
                        <Space size="middle">
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => setEditingCompany(record)}
                            >
                                Edit
                            </Button>
                            <Button
                                type="dashed"
                                icon={<DeleteOutlined />}
                                onClick={() => showDeleteConfirm(record)}
                            >
                                Delete
                            </Button>
                        </Space>
                    )}
                />
            </Table>





            {/* Edit Company Form */}
            {editingCompany !== null && (
                <>
                    <h3>{editingCompany ? 'Edit' : 'Add'} Company</h3>
                    <Form form={form} onFinish={editingCompany ? handleEditCompany : handleAddCompany}>
                        <Form.Item
                            name="companyName"
                            label="Company Name"
                            initialValue={editingCompany ? editingCompany.companyName : ''}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the company name',
                                },
                            ]}
                        >
                            <Input placeholder="Company Name" />
                        </Form.Item>

                        <Form.Item
                            name="legalNumber"
                            label="Legal Number"
                            rules={[{ required: true, message: 'Please enter the legal number' }]}
                            initialValue={editingCompany ? editingCompany.legalNumber : ''}
                        >
                            <Input placeholder="Legal Number" />
                        </Form.Item>

                        <Form.Item
                            name="country"
                            label="Incorporation Country"
                            rules={[{ required: true, message: 'Please enter the incorporation country' }]}
                            initialValue={editingCompany ? editingCompany.country : ''}
                        >
                            <Input placeholder="Incorporation Country" />
                        </Form.Item>



                        <Form.Item
                            name="website"
                            label="Website"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the company website',
                                },
                                {
                                    type: 'url',
                                    pattern:urlPattern,
                                    message: 'Please enter a valid URL',
                                },
                            ]}
                            initialValue={editingCompany ? editingCompany.website : ''}
                        >
                            <Input placeholder="Website" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {editingCompany?'Save':'Add'}
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </div>
    );
}

export default Companies;
