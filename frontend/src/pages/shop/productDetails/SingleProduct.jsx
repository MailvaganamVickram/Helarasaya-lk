import React from 'react'
import { Link, useParams } from 'react-router-dom'
import RatingStars from '../../../components/RatingStars';



const SingleProduct = () => {
    const {id} = useParams();
    console.log(id);

   

  return (
    <>
       <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Single Product Page</h2>
                <div className='section__subheader space-x-2'>
                    <span className='hover:text-primary'><Link to="/">home</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-primary'><Link to="/shop">shop</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-primary'>{}</span>
                </div>
            </section>

            <section className='section__container mt-8'>
                <div className='flex flex-col items-center md:flex-row gap-8'>
                    {/* Product image */}
                    <div className='md:w-1/2 w-full' >
                    <img className='rounded-md w-full h-auto' src='' alt=''/>
                    </div>

                    <div className='md:w-1/2 w-full' >
                    <h3 className='text-2xl font-semibold mb-4'> Product name</h3>
                    <p className='text-xl text-red-500 mb-4'>LKR100 <s>LKR150</s></p>
                    <p className='text-gray-200 mb-4'>This is product description</p>
                      {/* additional product info */}
                      <div>
                        <p><strong>Category:</strong> Sweet</p>
                        <p><strong>Color:</strong> Brown</p>
                        <div className='flex gap-1 items-center'>
                          <strong>Rating :</strong>
                        <RatingStars rating={4}/>
                        </div>
                      </div>
                      <button className='mt-6 px-6 py-3 bg-red-700 text-white rounded'>
                        Add to cart
                      </button>
                    </div>
                    
                </div>
            </section>

            {/* display  Reviews */}
            {/* display  Reviews */}
            <section className='section__container mt-8'>
              Reviews are here
            </section>
    </>
  )
}

export default SingleProduct
