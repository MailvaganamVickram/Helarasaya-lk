import React from 'react'
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto'
const AdminStatsChart = ({ stats }) => {
    console.log(stats)
    const pieData = {
        labels: ['Total Orders', 'Total Products', 'Total Reviews', 'Total Users'],
        datasets: [
            {
                label: "Admin Stats",
                data: [
                    stats?.totalOrders,
                    stats?.totalProducts,
                    stats?.totalReviews,
                    stats?.totalUsers,
                ],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                ]
            }
        ]
    }

    const data =  new Array(12).fill(0);
    // map correct months
    stats?.monthlyEarnings.forEach((entry) => {
        data[entry.month - 1] = entry.earnings;
    })

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Monthly Earnings',
                data, 
                fill: false,
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                tension: 0.1, 
            }
        ]
    }
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <div className='admin-stats'>
            <h2 className='admin-stats-title'>Admin Stats Overview</h2>
            <div className='admin-stats-grid'>
                {/* pie chart */}
                <div className='chart pie-chart'>
                    <Pie data={pieData} options={options}/>
                </div>

                {/* line chart */}
                <div>
                    <Line data={lineData} options={options}/>
                </div>
            </div>
            <div>
                <p className='admin-footer"'>Made with vickram</p>
            </div>
        </div>
    )
}

export default AdminStatsChart