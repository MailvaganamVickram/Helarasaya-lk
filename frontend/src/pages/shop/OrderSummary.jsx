import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice'

import { loadStripe } from "@stripe/stripe-js";
import { getBaseUrl } from '../../utils/baseURL';
import { Elements } from '@stripe/react-stripe-js';

const OrderSummary = () => {

  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  console.log(user)
  

  const products = useSelector((store) => store.cart.products);
  console.log(products)

  const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector((store) => store.cart);

  const handleClearCart = () => {
      dispatch(clearCart())
  }

  // payment integration
  const makePayment = async (e) => {
      const stripe =  await loadStripe("pk_test_51QSYBnSGjUfdN5varu0WV7SwGguhYAVnXK2sJOgHcfTRFOCKwi4FszreJf3zIYgVSSsAt0vqGbZOd2Si9ZIFyH1z00APAkFgUW");
      console.log(stripe)
      const body = {
          products: products,
          userId: user?._id
      }

      const headers = {
            "Content-Type": "application/json"
      }

      const response = await fetch(`${getBaseUrl()}/api/orders/create-checkout-session`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body)
      })

      console.log(response)

      
      const session =  await response.json()
      console.log("session: ", session);

      const result =  stripe.redirectToCheckout({
          sessionId: session.id
      })
      console.log("Result:",  result)
      if(result.error) {
          console.log("Error:", result.error)
      }
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
  <button 
  onClick={(e)=>{
    e.stopPropagation();
    makePayment();
  }}
  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300">
    <span>Proceed to Checkout<i className="ri-bank-card-fill"></i></span>
  </button>
</div>
        </div>
    </div>
  )
}

export default OrderSummary
