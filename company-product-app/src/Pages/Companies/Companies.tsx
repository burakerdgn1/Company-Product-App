/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Form, Space, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
//import { FilterDropdownProps } from 'antd/es/table/interface';

const { Column } = Table;
const { Search } = Input;
const { confirm } = Modal;
interface Company {
    _id: string;
    companyName: string;
    legalNumber: string;
    country: string;
    website: string;
}



function Companies() {


    const [companies, setCompanies] = useState<Company[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string>('');

    const [isAddCompanyVisible, setIsAddCompanyVisible] = useState(false);
    const [editingCompany, setEditingCompany] = useState<Company | null>(null);


    useEffect(() => {
        fetch('http://localhost:3000/api/companies')
            .then(
                
                (response) =>{
                    if(!response.ok){
                        throw new Error('Network response was not ok')
                    }
                     return response.json()})
            .then((data) => setCompanies(data))
            .catch((error) => console.error('Error fetching companies:', error));
    }, []);

    const toggleAddCompanyForm = () => {
        setIsAddCompanyVisible(!isAddCompanyVisible);
    };

    const formLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const [form] = Form.useForm();

    const handleAddCompany = (values: Company) => {
        form
            .validateFields()
            .then((values) => {
                fetch('http://localhost:3000/api/companies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                })
                    .then((response) => response.json())
                    .then((newCompany) => {
                        setCompanies([...companies, newCompany]);
                        form.resetFields();
                        setIsAddCompanyVisible(false);
                    })
                    .catch((error) => console.error('Error adding company:', error));
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    };


    const handleEditCompany = (values: Company) => {
        if (editingCompany) {
            fetch(`http://localhost:3000/api/companies/${editingCompany._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then((response) => response.json())
                .then((updatedCompany) => {
                    const updatedCompanies = companies.map((company) =>
                        company._id === updatedCompany._id ? updatedCompany : company
                    );
                    setCompanies(updatedCompanies);
                    setEditingCompany(null);
                    form.resetFields();
                })
                .catch((error) => console.error('Error updating company:', error));

        }

    };

    const showDeleteConfirm = (record: Company) => {
        confirm({
            title: 'Are you sure you want to delete this company?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDeleteCompany(record._id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleDeleteCompany = (companyId:any) => {
        fetch(`http://localhost:3000/api/companies/${companyId}`, {
            method: 'DELETE',
        })
            .then(() => {
                const updatedCompanies = companies.filter((company) => company._id !== companyId);
                setCompanies(updatedCompanies);
            })
            .catch((error) => console.error('Error deleting company:', error));
    };

    const handleSearch = (selectedKeys: string[] | null, confirm: (() => void) | null, dataIndex: string) => {
        if (confirm) {
            confirm();
        }
        setSearchText(selectedKeys ? selectedKeys[0] : '');
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    // interface CustomFilterDropdownProps {
    //     setSelectedKeys: (selectedKeys: React.Key[]) => void;
    //     selectedKeys: React.Key[];
    //     confirm: () => void;
    //     clearFilters: () => void;
    //   }

    // const getColumnSearchProps = (
    //     dataIndex: string
    //   ): {
    //     filterDropdown: (props: CustomFilterDropdownProps) => React.ReactNode;
    //     filterIcon: (filtered: boolean) => React.ReactNode;
    //     onFilter: (value: string, record: Company) => boolean;
    //     render: (text: string) => React.ReactNode;
    //   } => ({
    //     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: CustomFilterDropdownProps) => (
    //       <div style={{ padding: 8 }}>
    //         <Input
    //           placeholder={`Search ${dataIndex}`}
    //           value={selectedKeys[0] as string}
    //           onChange={(e) => setSelectedKeys([e.target.value])}
    //           onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
    //           style={{ width: 188, marginBottom: 8, display: 'block' }}
    //         />
    //         <Space>
    //           <Button
    //             type="primary"
    //             onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
    //             icon={<SearchOutlined />}
    //             size="small"
    //             style={{ width: 90 }}
    //           >
    //             Search
    //           </Button>
    //           <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
    //             Reset
    //           </Button>
    //         </Space>
    //       </div>
    //     ),
    //     filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    //     onFilter: (value: string, record: Company) =>
    //       record[dataIndex as keyof Company]
    //         ? record[dataIndex as keyof Company].toString().toLowerCase().includes(value.toLowerCase())
    //         : false,
    //     render: (text: string) =>
    //       searchedColumn === dataIndex ? (
    //         <Button type="link" onClick={() => handleSearch(null, null, dataIndex)}>
    //           {text}
    //         </Button>
    //       ) : (
    //         text
    //       ),
    //   });

    // const companyNameColumnSearchProps = getColumnSearchProps('companyName');


    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)?([\w-]+\/?)*\??([\w-]+=[\w-]*(\&[\w-]+=[\w-]*)*)?$/;


    return (
        <div key="companies">
            <h1>Companies</h1>
            {/* <Space style={{ marginBottom: 16 }}>
                <Search
                    placeholder="Search by company name"
                    allowClear
                    enterButton
                    onSearch={(value) => setSearchText(value)}
                />
            </Space> */}
            <Button type="primary" icon={<PlusOutlined />} onClick={toggleAddCompanyForm}>
                Add Company
            </Button>
            <Table dataSource={companies} size="middle" bordered key="companies">
                <Column
                    title="Company Name"
                    dataIndex="companyName"
                    key="companyName"
                /> 
                {/* //will be checked later

                // filterDropdown={(props: FilterDropdownProps) => */}
                {/* //     companyNameColumnSearchProps.filterDropdown({ */}
                {/* //         ...props,
                //         setSelectedKeys: props.setSelectedKeys as (selectedKeys: string[]) => void,
                //         selectedKeys: props.selectedKeys as string[],
                //         confirm: props.confirm as () => void,
                //         clearFilters: props.clearFilters as () => void,
                //     })
                // }
                // filterIcon={companyNameColumnSearchProps.filterIcon}
                // onFilter={companyNameColumnSearchProps.onFilter}
                // render={companyNameColumnSearchProps.render} */}
                
                <Column title="Legal Number" dataIndex="legalNumber" key="legalNumber" />
                <Column title="Incorporation Country" dataIndex="country" key="country" />
                <Column title="Website" dataIndex="website" key="website" />
                <Column
                    title="Actions"
                    key="actions"
                    render={(_, record: Company) => (
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

            
            {editingCompany !== null && (
                <>
                    <h3>{editingCompany ? 'Edit' : 'Add'} Company</h3>
                    <Form form={form} onFinish={editingCompany ? handleEditCompany : handleAddCompany}>
                        <Form.Item
                            name="companyName"
                            key="companyName"
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
                            key="legalNumber"
                            label="Legal Number"
                            rules={[{ required: true, message: 'Please enter the legal number' }]}
                            initialValue={editingCompany ? editingCompany.legalNumber : ''}
                        >
                            <Input placeholder="Legal Number" />
                        </Form.Item>

                        <Form.Item
                            name="country"
                            key="country"
                            label="Incorporation Country"
                            rules={[{ required: true, message: 'Please enter the incorporation country' }]}
                            initialValue={editingCompany ? editingCompany.country : ''}
                        >
                            <Input placeholder="Incorporation Country" />
                        </Form.Item>



                        <Form.Item
                            name="website"
                            key="website"
                            label="Website"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the company website',
                                },
                                {
                                    type: 'url',
                                    pattern: urlPattern,
                                    message: 'Please enter a valid URL',
                                },
                            ]}
                            initialValue={editingCompany ? editingCompany.website : ''}
                        >
                            <Input placeholder="Website" />
                        </Form.Item>

                        <Form.Item key="save-edit">
                            <Button type="primary" htmlType="submit">
                                {editingCompany ? 'Save' : 'Add'}
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}

            <Modal
                title="Add Company"
                open={isAddCompanyVisible}
                onCancel={toggleAddCompanyForm}
                footer={null}
            >
                <Form form={form} {...formLayout}>
                    <Form.Item
                        name="companyName"
                        key="companyName"
                        label="Company Name"
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
                        key="legalNumber"
                        label="Legal Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the legal number',
                            },
                        ]}
                    >
                        <Input placeholder="Legal Number" />
                    </Form.Item>

                    <Form.Item
                        name="country"
                        key="country"
                        label="Incorporation Country"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the incorporation country',
                            },
                        ]}
                    >
                        <Input placeholder="Incorporation Country" />
                    </Form.Item>

                    <Form.Item
                        name="website"
                        label="Website"
                        key="website"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the company website',
                            },
                            {
                                type: 'url',
                                message: 'Please enter a valid URL',
                            },
                        ]}
                    >
                        <Input placeholder="Website" />
                    </Form.Item>

                    <Form.Item key="add" wrapperCol={{ ...formLayout.wrapperCol, offset: 6 }}>
                        <Space>
                            <Button onClick={toggleAddCompanyForm}>Cancel</Button>
                            <Button type="primary" onClick={() => handleAddCompany(form.getFieldsValue())}>
                                Add
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>


        </div>
    );
}

export default Companies;
