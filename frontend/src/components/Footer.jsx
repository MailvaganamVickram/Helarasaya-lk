import React from 'react'
import image1 from '../assets/4.jpg'
import image2 from '../assets/7.jpg'
import image3 from '../assets/aluva.png'
import image4 from '../assets/miris-kokis5.jpg'
import image5 from '../assets/2.jpg'
import image6 from '../assets/Kotthu.jpeg'

const Footer = () => {
  return (
    <>
    <footer className='section__container footer__container'>
        <div className='footer__col'>
            <h4>Contact info</h4>
            <p>
                <span><i className="ri-map-pin-line"></i></span>
                123,Colombo Kotahena , Hill street
            </p>
            <p>
                <span><i className="ri-mail-line"></i></span>
                support@gmail.com
            </p>

            <p>
                <span><i className="ri-smartphone-line"></i></span>
                077-353 4698
            </p>

        </div>
        <div className='footer__col'>
        <h4>Compony</h4>
           <a href='/'>Home</a>
           <a href='/'>About Us</a>
           <a href='/'>Work with us</a>
           <a href='/'>Our Blog</a>
           <a href='/'>Terms&Conditions</a>
        </div>
        <div className='footer__col'>
        <h4>Useful Links</h4>
           <a href='/'>Help</a>
           <a href='/'>Track your order</a>
           <a href='/'>Sweet</a>
           <a href='/'>Drinks</a>
           <a href='/'>Savouries</a>
        </div>
        <div className='footer__col'>
            <h4>Instagram</h4>
            <div className='instagram__grid'>
                <img src={image1} alt=''></img>
                <img src={image2} alt=''></img>
                <img src={image3} alt=''></img>
                <img src={image4} alt=''></img>
                <img src={image5} alt=''></img>
                <img src={image6} alt=''></img>
            </div>
        </div>
    </footer>
    <div className='footer__bar'>
        Copyrights © 2024 by helarasaya.lk. All rights reserved
    </div>
    </>
  )
}

export default Footer
