import React from 'react'
import dealsImg from '../../assets/deals.png'

const DealsSection = () => {
  return (
    <section className='section__container deals__container'>
      <div className='deals__image'>
        <img src={dealsImg} alt=''></img>
      </div>

      <div className='deals__content'>
            <h5>Get up to 20% discount</h5>
            <h4>Deal of the month</h4>
            <p>Sri Lankan food is known for its bold flavors and aromatic spices. Rice and curry are staples, often paired with sambols and chutneys. 
                Dishes like kottu roti and hoppers showcase the island's 
                diverse and vibrant cuisine, blending sweet, sour, and spicy tastes.</p>
             <div className='deals__countdown flex-wrap'>
                <div className='deals__countdown__card'>
                    <h4>14</h4>
                    <p>days</p>
                </div>  
                <div className='deals__countdown__card'>
                    <h4>20</h4>
                    <p>hours</p>
                </div>  
                <div className='deals__countdown__card'>
                    <h4>15</h4>
                    <p>mins</p>
                </div>  
                <div className='deals__countdown__card'>
                    <h4>22</h4>
                    <p>secs</p>
                </div> 
             </div>   
      </div>
    </section>
  )
}

export default DealsSection
