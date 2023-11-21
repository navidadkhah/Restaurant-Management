import React from 'react'
import '../Cards/Cards.css'
import Logo from '../../../images/logo.png'
import { Bottun } from '../Bottun/Bottun'

export const Cards = () => {
  return (
    <div className='card'>
          <div className='card-image'><img src={Logo} alt="image" /></div>
          <div className="card-title"><p>meykhosh</p></div>
          <div className='card-title-description'>
              <div className="cart-food-type"><p>fast-food</p></div>
        <div className="cart-restaurant-order"><Bottun></Bottun></div>
          </div>
    </div>
  )
}

