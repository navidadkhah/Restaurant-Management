import { React, useEffect, useState } from 'react'
import { Cards } from '../Components/Cards/Cards'
import Logo from '../../images/logo.png'
import { IoSearchSharp } from "react-icons/io5";
import "./Homepage.css"

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
          <i><a href="#">Admin</a></i>
          <i><a href="#">Login</a></i>
          <i className='search'><a href="#"><IoSearchSharp/></a></i>
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
