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
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-50 transition-opacity 
      ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ transition: 'opacity 300ms' }}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      >
        {/* Modal Content */}
        <div className="p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-red-800 font-semibold">Your Cart</h4>
            <button 
              onClick={onClose}
              className="text-gray-300 hover:text-gray-900"
            >
              <i className="ri-close-line bg-black p-1 text-white"></i>
            </button>
          </div>

          {/* Product List */}
          <div>
            {products.length === 0 ? (
              <div className="text-center text-gray-500">Cart is empty</div>
            ) : (
              products.map((item, index) => (
                <div key={index} className="flex justify-between items-center my-2">
                  <div className="flex items-center">
                    <span className="mr-4 px-1 bg-primary text-white rounded-full">
                      {index + 1}
                    </span>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="rounded mr-4" 
                      style={{ width: '32px', height: '32px', objectFit: 'cover' }} // Enforced inline styles
                    />
                    <div>
                      <h5>{item.name}</h5>
                      <p>LKR {Number(item.price).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                      onClick={() =>handleQuantity('decrement', item.id)}
                        aria-label="Decrease quantity" 
                        className="px-2 py-1 border rounded-md text-lg"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                       onClick={() =>handleQuantity('increment', item.id)}
                        aria-label="Increase quantity" 
                        className="px-2 py-1 border rounded-md text-lg"
                      >
                        +
                      </button>
                      <div>
                        <button 
                        onClick={(e)=> handleRemove(e, item.id)}
                        className='text-red-500 hover:text-red-900'>
                          Remove
                          </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
            {/* Calculation  */}
            {
              products.length > 0 && (<OrderSummary/>)
            }
      </div>
    </div>
  );
};

export default CartModal;
