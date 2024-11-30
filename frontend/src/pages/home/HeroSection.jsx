import React from 'react'
import card1 from '../../assets/Kewum.jpg'
import card2 from '../../assets/miris-kokis5.jpg'
import card3 from '../../assets/aluva.png'

const HeroSection = () => {

    const cards = [
        {
            id: 1,
            image: card1,
            trend: '2024 trend',
            title: 'Best Kewuns '
        },
        {
            id: 2,
            image: card2,
            trend: '2024 trend',
            title: 'Best Kokis '
        },
        {
            id: 3,
            image: card3,
            trend: '2024 trend',
            title: 'Best Aluwas '
        },
    ]

  return (
    <div>
     <section className='section__container hero__container'>
        {
            cards.map((card) => (
                <div key={card.id} className='hero__card'>
                    <img src={card.image} alt={card.title} />
                    <div className='hero__content'>
                        <p>{card.trend}</p>
                        <h4>{card.title}</h4>
                        <a href="#"> Discover More!!</a>
                    </div>
                </div>
            ))
        }
     </section>
    </div>
  )
}

export default HeroSection