import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrdersByEmailQuery } from '../../../../redux/features/orders/orderApi';


const UserPayments = () => {
    const {user} = useSelector((state) => state.auth);
  const {data :ordersdata, error, isLoading} = useGetOrdersByEmailQuery(user?.email)

    if(isLoading) return <div>Loading....</div>
    if(error) return <div>No order found!</div>
    const orders =  ordersdata.orders || {};
    const totalPayment = orders?.reduce((acc, order) => acc + order.amount, 0).toFixed(2);
    console.log(totalPayment)

  return (
    <div className="payment-summary-container">
    <h3 className="text-xl font-semibold mb-4">Total Payments</h3>
    <div>
        <p className="total-spent-text">Total Spent: LKR {totalPayment ? totalPayment : 0}</p>
        <ul className="payment-list">
            {orders &&
                orders.map((item, index) => (
                    <li key={index}>
                        <h5 className="font-medium text-gray-800 mb-2">Order #{index + 1}</h5>
                        <div>
                            <span className="text-gray-600">Order # LKR{item?.amount.toFixed(2)}</span>
                        </div>
                        <div className="order-date-status">
                            <span className="order-date text-gray-600">
                                Date: {new Date(item?.createdAt).toLocaleString()}
                            </span>
                            <p className="text-gray-600">
                                | Status:{" "}
                                <span
                                    className={`order-status ${
                                        item?.status === "completed"
                                            ? "status-completed"
                                            : item?.status === "pending"
                                            ? "status-pending"
                                            : item?.status === "processing"
                                            ? "status-processing"
                                            : "status-default"
                                    } `}
                                >
                                    {item?.status}
                                </span>
                            </p>
                        </div>
                        <hr className="my-2" />
                    </li>
                ))}
        </ul>
    </div>
</div>

  )
}

export default UserPayments
