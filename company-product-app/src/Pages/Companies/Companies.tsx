import React, { useState } from 'react';
import { Table, Button, Input, Form, Space, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
    const [companies, setCompanies] = useState(dummyCompanies);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [form] = Form.useForm();



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
                    key="companyName"
                    {...getColumnSearchProps('companyName')}
                />
                <Column title="Legal Number" dataIndex="legalNumber" key="legalNumber" />
                <Column title="Incorporation Country" dataIndex="country" key="country" />
                <Column title="Website" dataIndex="website" key="website" />
                <Column
                    title="Actions"
                    key="actions"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => setEditingCompany(record)}
                            >
                                Edit
                            </Button>
                            <Button
                                type="danger"
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
