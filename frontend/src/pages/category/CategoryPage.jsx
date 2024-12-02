import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import products from '../../data/products.json'
import ProductCards from '../shop/ProductCards';

const CategoryPage = () => {

    const {categoryName} =useParams();
    console.log(categoryName); //access the category name from the URL

   const [filteredProducts, setfilteredProducts] = useState([]);

   useEffect(()=>{
    const filtered = products.filter((product)=>product.category === categoryName.toLowerCase
    ())
    setfilteredProducts(filtered);
   } , [categoryName])

   useEffect(()=>{
    window.scrollTo(0,0)
   })
  return (
    <>
      <section className='bg-primary-light section__container'>
        <h2 className='section__header uppercase'>{categoryName}</h2>
        <p className='section__subheader'>Browse a diverse range of categories, from local sweets to drinks.</p>

      </section>
      {/* product card */}
      <div>
        <ProductCards products={filteredProducts}/>
      </div>
    </>
  )
}

export default CategoryPage
