import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice'

const OrderSummary = () => {

    const products = useSelector((store) =>store.cart.products)
    const {tax, taxRate, totalPrice, grandTotal, selectedItems} = useSelector((store) => store.cart)
    const dispatch =  useDispatch()

    const handleClearCart = () => {
        dispatch(clearCart())
    }


  return (
    <div className='bg-primary-light mt-5 rounder text-base'>
        <div className='px-6 py-4 space-y-5'>
            <h2 className='text-2xl font-bold text-dark'>
                Order Summary
            </h2>
            <p className='text-text-dark mt-2'>Selected Items : {selectedItems}</p>
            <p>Total Price: LKR {totalPrice.toFixed(2)}</p>
            <p>Tax : ({taxRate * 100}%) : LKR{tax.toFixed(2)}</p>
            <h3>Grand Total : LKR {grandTotal.toFixed(2)}</h3>
            <div className="px-4 mb-6 space-x-4">
  <button 
  onClick={(e)=>{e.stopPropagation()
    
    handleClearCart()}}
  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-300">
  <span>Clear Cart</span><i className="ri-delete-bin-7-fill"></i>
  </button>
  <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300">
    <span>Proceed to Checkout<i className="ri-bank-card-fill"></i></span>
  </button>
</div>
        </div>
    </div>
  )
}

export default OrderSummary
