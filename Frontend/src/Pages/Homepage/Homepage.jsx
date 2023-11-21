import { React, useEffect, useState } from 'react'
import { Cards } from '../Components/Cards/Cards'
import Logo from '../../images/logo.png'
import "../Homepage/Homepage.css"

export const Homepage = () => {
  useEffect(() => {

  }, [])
  return (
    <div className='home'>
      <div className="navbar">
        <div className='navbar-img'>
          <img src={Logo} alt="logo" />
        </div>
        <ul className="navbar-ul">
          <i><a href="#">Home</a></i>
          <i><a href="#">About</a></i>
          <i><a href="#">Admin</a></i>
          <i><a href="#">Login</a></i>
        </ul>
      </div>
      <div className="home-content">
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        
      </div>
    </div>
  )
}
