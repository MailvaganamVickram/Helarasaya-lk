import React from 'react';
import OrderSummary from './OrderSummary';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/features/cart/cartSlice';

const CartModal = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const handleQuantity = (type, id) => {
    const payload = {type, id}
    dispatch(updateQuantity(payload))
  }
  const handleRemove =(e, id) => {
    e.preventDefault()
    dispatch(removeFromCart({id}))
  }
  return (
    <div
    className={`cart-overlay fixed z-[1000] inset-0 bg-black bg-opacity-50 transition-opacity 
      ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
  >
    <div
      className={`cart-modal fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* Modal Content */}
      <div className="modal-content p-6">
        {/* Header */}
        <div className="modal-header flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold text-gray-800">Your Cart</h4>
          <button 
            onClick={onClose}
            className="close-button text-gray-500 hover:text-red-500 transition duration-200"
            aria-label="Close Cart"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
  
        {/* Product List */}
        <div className="modal-body space-y-4">
          {products.length === 0 ? (
            <div className="text-center text-gray-500">Your cart is empty.</div>
          ) : (
            products.map((item, index) => (
              <div key={index} className="product-item flex justify-between items-center p-2 border-b">
                <div className="product-info flex items-center gap-4">
                  <span className="product-index px-2 py-1 bg-primary text-white rounded-full">
                    {index + 1}
                  </span>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h5 className="product-name text-lg font-medium">{item.name}</h5>
                    <p className="product-price text-sm text-gray-600">LKR {Number(item.price).toFixed(2)}</p>
                  </div>
                </div>
                <div className="product-actions flex items-center gap-2">
                  <button
                    onClick={() => handleQuantity('decrement', item.id)}
                    className="quantity-decrement px-2 py-1 border rounded-md text-lg"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="product-quantity">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantity('increment', item.id)}
                    className="quantity-increment px-2 py-1 border rounded-md text-lg"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, item.id)}
                    className="remove-button text-red-500 hover:text-red-700"
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
  
        {/* Order Summary */}
        {products.length > 0 && <OrderSummary />}
      </div>
    </div>
  </div>
  
  );
};

export default CartModal;
