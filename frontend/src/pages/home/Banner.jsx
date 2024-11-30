import React from 'react'
import { Link } from 'react-router-dom';
import bannerImg from "../../assets/71.png"

const Banner = () => {
  return (
    <div className='section__container header__container'>
      <div className='header__content z-30'>
        <h4 className='uppercase'>UP to 20% discount on</h4>
        <h1>Local Kewum</h1>
        <p>Celebrate the taste of Sri Lankan heritage with our perfectly crafted 
            Kewun crispy on the outside, soft and sweet on the inside. Made with the finest rice flour and rich treacle, each bite is a delicious 
            journey through tradition. Perfect for festive occasions or as a treat to satisfy your sweet cravings!</p>
            <button className='btn'>  <Link to="/shop" className="block w-full h-full text-center">
        EXPLORE NOW
      </Link>
      
      </button>
      </div>
      <div className="max-w-full overflow-hidden relative bg-gray-100 shadow-md">
            <img src={bannerImg} alt="banner image" className="w-full h-auto" />
      </div>
    </div>
  )
}

export default Banner
