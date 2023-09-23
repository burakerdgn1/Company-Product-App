/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-redeclare */
import React from "react";
import Company from '../Companies/Companies';
import Companies from '../Companies/Companies';
import Product from '../Products/Products';
import Products from '../Products/Products';
import { Card, Statistic, List } from "antd";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Link,Route,Routes} from "react-router-dom";


interface Company {
    key: string;
    companyName: string;
    legalNumber: string;
    country: string;
    website: string;

}
interface Product {
    key: string;
    productName: string;
    productCategory: string;
    productAmount: number;
    amountUnit: string;
    company: string;
}

interface HomePageProps {
    companies: Company[];
    products: Product[];
}


function Homepage({ companies, products }: HomePageProps) {
    const companyDistribution: any = {};
    const totalProducts = products.length;
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

    const productDistributionByCountry: any = {};
    products.forEach((product) => {
        const country = product.company;
        if (productDistributionByCountry[country]) {
            productDistributionByCountry[country]++;
        } else {
            productDistributionByCountry[country] = 1;
        }
    });
    const barChartDataByCountry = {
        labels: Object.keys(productDistributionByCountry).map((country) => country || 'Unknown'), // Country names
        datasets: [
            {
                data: Object.values(productDistributionByCountry), // Product counts by country
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



    const totalCompanies = companies.length;
    const latestCompanies = companies.slice(0, 3);




    return (
        <div>
            <h1>Welcome to The Dashboard</h1>

            <Card>
                <Statistic title="Total Companies" value={totalCompanies} />
            </Card>

            <Card title="Total Products">
                <Statistic title="Total Products" value={totalProducts} />
            </Card>



            <Card title="Latest Added Companies">
                <List
                    dataSource={latestCompanies}
                    renderItem={(company: Company) => (
                        <List.Item>
                            <a href="#">{company.companyName}</a>
                        </List.Item>
                    )}
                />
            </Card>

            <h2>Product Distribution by Country</h2>
            <Bar
                data={barChartDataByCountry}
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