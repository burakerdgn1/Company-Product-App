/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Table, Button, Input, Form, Space, Modal, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './Products.css';

const { Column } = Table;
const { confirm } = Modal;
const { Option } = Select;



interface Product {
    _id: string;
    productName: string;
    productCategory: string;
    productAmount: number;
    amountUnit: string;
    company: string;
}

function Products() {
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [form] = Form.useForm();
    const [isAddProductVisible, setIsAddProductVisible] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const showDeleteConfirm = (record: Product) => {
        confirm({
            title: 'Are you sure you want to delete this product?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDeleteProduct(record._id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleDeleteProduct = (productId: string) => {
        fetch(`http://localhost:3000/api/products/${productId}`, {
            method: 'DELETE',
        })
            .then(() => {
                const updatedProducts = products.filter(product => product._id !== productId);
                setProducts(updatedProducts);
            })
            .catch(error => console.error('Error deleting product:', error));
    };

    const handleEditProduct = (values: Product) => {
        if (editingProduct) {
            fetch(`http://localhost:3000/api/products/${editingProduct._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(response => response.json())
                .then(updatedProduct => {
                    const updatedProducts = products.map(product =>
                        product._id === updatedProduct._id ? updatedProduct : product
                    );
                    setProducts(updatedProducts);
                    setEditingProduct(null);
                    form.resetFields();
                })
                .catch(error => console.error('Error updating product:', error));
        }
    };

    const handleAddProduct = () => {
        form
            .validateFields()
            .then(values => {
                fetch('http://localhost:3000/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                })
                    .then(response => response.json())
                    .then(newProduct => {
                        setProducts([...products, newProduct]);
                        form.resetFields();
                        setIsAddProductVisible(false);
                    })
                    .catch(error => console.error('Error adding product:', error));
            })
            .catch(errorInfo => {
                console.log('Validation failed:', errorInfo);
            });


    };


    const companyOptions = [Array.from(new Set(products.map((product) => product.company)))];


    const toggleAddProductForm = () => {
        setIsAddProductVisible(!isAddProductVisible);
    };



    return (
        <div className="products-container">
            <h1 className="products-header">Products</h1>
            <Button type="primary" className="add-product-button" icon={<PlusOutlined />} onClick={toggleAddProductForm}>
                Add Product
            </Button>

            <Table dataSource={products} size="middle" bordered className="product-table">
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
                <div className="add-edit-form">
                    <h3 className="form-title">{editingProduct ? 'Edit' : 'Add'} Product</h3>

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
                            className="form-input"
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
                            className="form-input"

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
                            className="form-input"

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
                            className="form-input"

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
                            className="form-input"

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

                        <Form.Item key="save-edit" className="form-button">
                            <Button type="primary" htmlType="submit">
                                {editingProduct ? 'Save' : 'Add'}
                            </Button>
                        </Form.Item>

                    </Form>

                </div>
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
                            {companyOptions[0].map((company, index) => (
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