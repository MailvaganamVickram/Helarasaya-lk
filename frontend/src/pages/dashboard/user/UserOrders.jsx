import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrdersByEmailQuery } from '../../../redux/features/orders/orderApi';
import { Link } from 'react-router-dom';

const UserOrders = () => {
    const {user} = useSelector((state) => state.auth);
    const {data: orderdata, error, isLoading} = useGetOrdersByEmailQuery(user?.email);
    const orders = orderdata?.orders;
    console.log(orders)

    if(isLoading)  return <div>Loading...</div>
    if(error) return <div>No order found!</div>
    return (
        <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">Your Orders</h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                        </div>
                    </div>
                </div>
    
                <div className="block w-full overflow-x-auto">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>View Order</th>
                            </tr>
                        </thead>
    
                        <tbody>
                            {
                                orders && orders.map((order, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{order?.orderId}</td>
                                        <td>{new Date(order?.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`status-${order?.status}`}>
                                                {order?.status}
                                            </span>
                                        </td>
                                        <td>{order?.amount}</td>
                                        <td>
                                            <Link to={`/orders/${order?._id}`} className='underline hover:text-primary'>
                                                view order
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
        <footer className="footer">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                        <div className="footer-text">
                            Made with <a href="https://www.creative-tim.com/product/notus-js" className="hover:text-gray-800" target="_blank" rel="noopener noreferrer">Notus JS</a> by 
                            <a href="https://www.creative-tim.com" className="hover:text-blueGray-800" target="_blank" rel="noopener noreferrer">Creative Tim</a>.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </section>
    
    )
}

export default UserOrders
