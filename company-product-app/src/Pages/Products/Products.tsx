import React, { useState } from "react";
import { Table, Button, Input, Form, Space, Modal, Select } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Column } = Table;
const { Search } = Input;
const { confirm } = Modal;
const { Option } = Select;

const dummyProducts = [
    {
        key: '1',
        productName: 'Product A',
        productCategory: 'Category A',
        productAmount: 100,
        amountUnit: 'kg',
        company: 'Company A',
    },
    {
        key: '2',
        productName: 'Product B',
        productCategory: 'Category B',
        productAmount: 50,
        amountUnit: 'pieces',
        company: 'Company B',
    },
];



function Products() {
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    interface Product {
        key: string;
        productName: string;
        productCategory: string;
        productAmount: number;
        amountUnit: string;
        company: string;
    }



    const [products, setProducts] = useState<Product[]>(dummyProducts);
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string>('');
    const [form] = Form.useForm();
    const [isAddProductVisible, setIsAddProductVisible] = useState(false);

    const showDeleteConfirm = (record: Product) => {
        confirm({
            title: 'Are you sure you want to delete this product?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDeleteProduct(record.key);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleDeleteProduct = (key: string) => {
        const updatedProducts = products.filter((product) => product.key !== key);
        setProducts(updatedProducts);
    };

    const handleEditProduct = (values: any) => {
        if (editingProduct) {
            const updatedProducts = products.map((product) =>
                product.key === editingProduct.key ? { ...product, ...values } : product
            );
            setProducts(updatedProducts);
            setEditingProduct(null);
            form.resetFields();
        }
    };

    const handleAddProduct = () => {
        form
            .validateFields()
            .then((values) => {
                const newProduct = {
                    key: (products.length + 1).toString(),
                    ...values,
                };
                setProducts([...products, newProduct]);
                form.resetFields();
                setIsAddProductVisible(false);
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });


    };


    const companyOptions = [Array.from(new Set(products.map((product) => product.company)))];


    const toggleAddProductForm = () => {
        setIsAddProductVisible(!isAddProductVisible);
    };



    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={toggleAddProductForm}>
                Add Product
            </Button>

            <Table dataSource={products} size="middle" bordered>
                <Column title="Product Name" dataIndex="productName" key="productName" />
                <Column title="Product Category" dataIndex="productCategory" key="productCategory" />
                <Column title="Product Amount" dataIndex="productAmount" key="productAmount" />
                <Column title="Amount Unit" dataIndex="amountUnit" key="amountUnit" />
                <Column title="Company" dataIndex="company" key="company" />
                <Column
                    title="Actions"
                    key="actions"
                    render={(_, record: Product) => (
                        <Space size="middle">
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => setEditingProduct(record)}
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

            {editingProduct != null && (
                <>
                    <Form form={form} onFinish={editingProduct ? handleEditProduct : handleAddProduct}>
                        <Form.Item
                            name="productName"
                            label="Product Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the product name',
                                },
                            ]}
                            initialValue={editingProduct ? editingProduct.productName : ''}
                        >
                            <Input placeholder="Product Name" />
                        </Form.Item>



                        <Form.Item
                            name="productCategory"
                            label="Product Category"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the product category',
                                },
                            ]}
                            initialValue={editingProduct ? editingProduct.productCategory : ''}
                        >
                            <Input placeholder="Product Category" />
                        </Form.Item>

                        <Form.Item
                            name="productAmount"
                            label="Product Amount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the product amount',
                                },
                            ]}
                            initialValue={editingProduct ? editingProduct.productAmount : ''}
                        >
                            <Input type="number" placeholder="Product Amount" />
                        </Form.Item>

                        <Form.Item
                            name="amountUnit"
                            label="Amount Unit"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the amount unit',
                                },
                            ]}
                            initialValue={editingProduct ? editingProduct.amountUnit : ''}
                        >
                            <Input placeholder="Amount Unit" />
                        </Form.Item>

                        <Form.Item
                            name="company"
                            label="Company"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select the company',
                                },
                            ]}
                            initialValue={editingProduct ? editingProduct.company : undefined}
                        >
                            <Select placeholder="Select a company">
                                {companyOptions[0].map((company, index) => (
                                    <Option key={index.toString()} value={company}>
                                        {company}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {editingProduct ? 'Save' : 'Add'}
                            </Button>
                        </Form.Item>

                    </Form>

                </>
            )}

            <Modal title="Add Product"
                open={isAddProductVisible}
                onCancel={toggleAddProductForm}
                footer={null}>
                <Form form={form} onFinish={handleAddProduct}>
                    <Form.Item
                        name="productName"
                        label="Product Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the product name',
                            },
                        ]}
                    >
                        <Input placeholder="Product Name" />
                    </Form.Item>

                    <Form.Item
                        name="productCategory"
                        label="Product Category"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the product category',
                            },
                        ]}
                    >
                        <Input placeholder="Product Category" />
                    </Form.Item>

                    <Form.Item
                        name="productAmount"
                        label="Product Amount"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the product amount',
                            },
                        ]}
                    >
                        <Input type="number" placeholder="Product Amount" />
                    </Form.Item>




                    <Form.Item
                        name="amountUnit"
                        label="Amount Unit"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the amount unit',
                            },
                        ]}
                    >
                        <Input placeholder="Amount Unit" />
                    </Form.Item>

                    <Form.Item
                        name="company"
                        label="Company"
                        rules={[
                            {
                                required: true,
                                message: 'Please select the company',
                            },
                        ]}
                    >
                        <Select placeholder="Select a company">
                            {companyOptions[0].map((company,index) => (
                                <Option key={index.toString()} value={company}>
                                    {company}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6 }}>
                        <Space>
                            <Button onClick={toggleAddProductForm}>Cancel</Button>
                            <Button type="primary" htmlType="submit">
                                Add
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>


            </Modal>







        </div>
    );

}

export default Products;