import React, { useState } from 'react';
import { useUpdateOrderStatusMutation } from '../../../../redux/features/orders/orderApi';

const UpdateOrderModal = ({ order, isOpen, onClose }) => {
    const [status, setStatus] = useState(order?.status || 'pending');
    const [updateOrderStatus, { isLoading, error }] = useUpdateOrderStatusMutation();

    const handleUpdateOrderStatus = async () => {
        try {
            await updateOrderStatus({ id: order?._id, status });
            onClose();  // Close the modal after successful update
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
        <div className="modal-container">
          <h2 className="modal-title">Update Order Status</h2>
          
          <div className="mb-4">
            <label className="modal-label" htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="modal-select"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          {error && <p className="modal-error">Failed to update status.</p>}
          
          <div className="modal-buttons">
            <button
              onClick={onClose}
              className="modal-cancel-btn"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateOrderStatus}
              disabled={isLoading}
              className={`modal-update-btn ${isLoading ? 'bg-gray-300' : ''}`}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    
    );
};

export default UpdateOrderModal;
