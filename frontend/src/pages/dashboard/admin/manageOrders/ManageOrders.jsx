
import React, { useState } from 'react'
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../../redux/features/orders/orderApi';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../../utils/formateDate';
import UpdateOrderModal from './UpdateOrderModal';


const ManageOrders = () => {
    const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteOrder] = useDeleteOrderMutation();

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    }

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId).unwrap();
            alert("Order deleted successfully");
            refetch();

        } catch (error) {
            console.error("Failed to delete order:", err);
        }
    }

    if (isLoading) return <div>Loading....</div>
    if (error) return <div>Something went wrong!</div>

  return (
    <div className="manage-orders-container p-6">
    <h2 className="section-title">Manage Orders</h2>
    
    <table className="orders-table">
        <thead className="orders-table-header">
            <tr>
                <th className="orders-table-header-cell">Order Id</th>
                <th className="orders-table-header-cell">Customer</th>
                <th className="orders-table-header-cell">Status</th>
                <th className="orders-table-header-cell">Date</th>
                <th className="orders-table-header-cell">Actions</th>
            </tr>
        </thead>

        <tbody>
            {orders && orders.map((order, index) => (
                <tr key={index}>
                    <td className="orders-table-cell">{order?.orderId}</td>
                    <td className="orders-table-cell">{order?.email}</td>
                    <td className="orders-table-cell">
                        <span className={`status-badge ${getStatusColor(order?.status)}`}>
                            {order?.status}
                        </span>
                    </td>
                    <td className="orders-table-cell">{formatDate(order?.updatedAt)}</td>
                    <td className="orders-table-cell actions-cell">
                        <Link to="#" className="action-link view-link">View</Link>
                        <button className="action-link edit-link" onClick={() => handleEditOrder(order)}>
                            Edit
                        </button>
                        <button className="action-link delete-link" onClick={() => handleDeleteOrder(order?._id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    
    {/* Update order modal */}
    {selectedOrder && (
        <UpdateOrderModal 
            order={selectedOrder}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
        />
    )}
</div>

  )
  
}
const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-500';
        case 'processing':
            return 'bg-blue-500';
        case 'shipped':
            return 'bg-green-500';
        case 'completed':
            return 'bg-gray-500';
        default:
            return 'bg-gray-300';
    }
};


export default ManageOrders
