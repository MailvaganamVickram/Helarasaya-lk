import React, { useState } from 'react'
import ProductCards from './ProductCards'
import products from '../../data/products.json'

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts]= useState(8);
    const loadMoreProducts = () => {
        setVisibleProducts(prevCount => prevCount + 4)
    }
  return (
    <section className='section__container product__container'>
      <h2 className='section__header'>Trending Products</h2>


      <p className='section__subheader mb-12'>
      Craving bold, delicious, and unique flavors? Dive into the heart of 
      Sri Lankan cuisine with Kottu Roti, Hoppers, Sri Lankan Rice & Curry, 
      and more! Whether it's a spicy kick or a sweet treat, every dish is an adventure in taste.
      </p>
      
      {/* Products cards */}
      <div className="mt-12">
      <ProductCards products={products.slice(0,visibleProducts)} />
      </div>
        {/* Load more button */}
      <div className='product__btn'>
            {
                visibleProducts <products.length && (
                    <button className='btn' onClick={loadMoreProducts}>Load More</button>
                )
            }
      </div>
        
    </section>
  )
}

export default TrendingProducts
