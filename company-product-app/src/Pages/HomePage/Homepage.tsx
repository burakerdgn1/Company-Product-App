/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useState,useEffect } from "react";
import { Card, Statistic, List } from "antd";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";


interface Company {
    _id: string;
    companyName: string;
    legalNumber: string;
    country: string;
    website: string;

}
interface Product {
    _id: string;
    productName: string;
    productCategory: string;
    productAmount: number;
    amountUnit: string;
    company: string;
}




function Homepage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch(error => console.error('Error fetching companies:', error));

        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);



    const companyDistribution: any = {};
    companies.forEach((company) => {
        const country = company.country;
        if (companyDistribution[country]) {
            companyDistribution[country]++;
        } else {
            companyDistribution[country] = 1;
        }
    });

    const barChartData = {
        labels: Object.keys(companyDistribution).map((country) => country || 'Unknown'), // Country names
        datasets: [
            {
                data: Object.values(companyDistribution), // Company counts
            },
        ],
    };

    const productDistributionByCompany: any = {};
    products.forEach((product) => {
        const company = product.company;
        if (productDistributionByCompany[company]) {
            productDistributionByCompany[company]++;
        } else {
            productDistributionByCompany[company] = 1;
        }
    });
    const barChartDataByCompany = {
        labels: Object.keys(productDistributionByCompany).map((company) => company || 'Unknown'), 
        datasets: [
            {
                data: Object.values(productDistributionByCompany), 
            },
        ],
    };

    const productDistributionByCategory: any = {};
    products.forEach((product) => {
        const category = product.productCategory;
        if (productDistributionByCategory[category]) {
            productDistributionByCategory[category]++;
        } else {
            productDistributionByCategory[category] = 1;
        }
    });

    const barChartDataByCategory = {
        labels: Object.keys(productDistributionByCategory), // Category names
        datasets: [
            {
                data: Object.values(productDistributionByCategory), // Product counts by category
            },
        ],
    };





    return (
        <div>
            <h1>Welcome to The Dashboard</h1>

            <Card>
                <Statistic title="Total Companies" value={companies.length} />
            </Card>

            <Card title="Total Products">
                <Statistic title="Total Products" value={products.length} />
            </Card>



            <Card title="Latest Added Companies">
                <List
                    dataSource={companies.slice(0,3)}
                    renderItem={(company: Company) => (
                        <List.Item>
                            <a href="#">{company.companyName}</a>
                        </List.Item>
                    )}
                />
            </Card>

            <h2>Product Distribution by Company</h2>
            <Bar
                data={barChartDataByCompany}
                options={{
                    scales: {
                        
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                            },
                            
                        },
                        

                    },
                   
                    
                }}
            />

            <h2>Product Distribution by Category</h2>
            <Bar
                data={barChartDataByCategory}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                            },
                        },
                    },
                    
                }}
            />

            <h2>Company Distribution by Country</h2>
            <Bar
                data={barChartData}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        },
                    },
                    
                }}
            />
        </div>
    )


}

export default Homepage;