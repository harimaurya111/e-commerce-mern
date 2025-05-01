import React from 'react'
import { Link } from 'react-router-dom'
import bannerImage from '../../assets/header.png'

const Banner = () => {
  return (
    <div className='section__container header__container'>
        <div className='header__content z-30'>
            <h4 className='uppercase'>Up to 20% Discount On</h4>
            <h1>Girls's Fashion</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, eius ratione maiores minus accusantium autem culpa mollitia rem optio porro! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe, cum?
            </p>
            <button className='btn'><Link to= "/shop">Explore Now</Link></button>
        </div>

        <div className='header__image'>
            <img src={bannerImage} alt="banner image" />
        </div>
    </div>
  )
}

export default Banner