import React, { useState } from 'react';
import { Table, Button, Input, Form, Space, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
//import { FilterDropdownProps } from 'antd/es/table/interface';

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
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string>('');

    const [isAddCompanyVisible, setIsAddCompanyVisible] = useState(false);

    const toggleAddCompanyForm = () => {
        setIsAddCompanyVisible(!isAddCompanyVisible);
    };

    const formLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const [form] = Form.useForm();

    const handleAddCompany = (values: any) => {
        form
            .validateFields()
            .then((values) => {
                const newCompany = {
                    key: (companies.length + 1).toString(),
                    ...values,
                };
                setCompanies([...companies, newCompany]);
                form.resetFields();
                setIsAddCompanyVisible(false);
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    };

    const [editingCompany, setEditingCompany] = useState<Company | null>(null);

    const handleEditCompany = (values: any) => {
        if (editingCompany) {
            const updatedCompanies = companies.map((company) =>
                company.key === editingCompany.key ? { ...company, ...values } : company
            );
            setCompanies(updatedCompanies);
            setEditingCompany(null);
            form.resetFields();

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
                handleDeleteCompany(record.key);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleDeleteCompany = (key: string) => {
        const updatedCompanies = companies.filter((company) => company.key !== key);
        setCompanies(updatedCompanies);
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
        <div>
            <h2>Companies</h2>
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
            <Table dataSource={companies} size="middle" bordered>
                <Column
                    title="Company Name"
                    dataIndex="companyName"
                    key="companyName"

                //will be checked later

                // filterDropdown={(props: FilterDropdownProps) =>
                //     companyNameColumnSearchProps.filterDropdown({
                //         ...props,
                //         setSelectedKeys: props.setSelectedKeys as (selectedKeys: string[]) => void,
                //         selectedKeys: props.selectedKeys as string[],
                //         confirm: props.confirm as () => void,
                //         clearFilters: props.clearFilters as () => void,
                //     })
                // }
                // filterIcon={companyNameColumnSearchProps.filterIcon}
                // onFilter={companyNameColumnSearchProps.onFilter}
                // render={companyNameColumnSearchProps.render}
                />
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
                                    pattern: urlPattern,
                                    message: 'Please enter a valid URL',
                                },
                            ]}
                            initialValue={editingCompany ? editingCompany.website : ''}
                        >
                            <Input placeholder="Website" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {editingCompany ? 'Save' : 'Add'}
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}

            <Modal
                title="Add Company"
                visible={isAddCompanyVisible}
                onCancel={toggleAddCompanyForm}
                footer={null}
            >
                <Form form={form} {...formLayout}>
                    <Form.Item
                        name="companyName"
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

                    <Form.Item wrapperCol={{ ...formLayout.wrapperCol, offset: 6 }}>
                        <Space>
                            <Button onClick={toggleAddCompanyForm}>Cancel</Button>
                            <Button type="primary" onClick={handleAddCompany}>
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
