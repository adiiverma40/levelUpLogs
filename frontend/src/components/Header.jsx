import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom"
import {useSelector} from "react-redux"
function Header() {
  const selector = useSelector((state) => state.user)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  console.log(selector);

  useEffect(()=>{
    if(selector.isLoggedIn){
      setIsLoggedIn(true)
      console.log("true");
      
    }
    else{
      setIsLoggedIn(false)
    }
  },[selector.isLoggedIn])
  
  return (
    <header className='h-14 ' style={{ backgroundColor: "#2A2E45" }}>
      <div className='h-full w-full flex justify-between align-center'>
        <ul className='flex items-center  text-white text-lg font-semibold hover:cursor-pointer'>
          <NavLink to={"/"}> <li className="mx-1 px-4">Home </li></NavLink>
          <NavLink to={"/"}> <li className="mx-1 px-4">Home </li></NavLink>
          <NavLink to={"/"}> <li className="mx-1 px-4">Home </li></NavLink>
          <NavLink to={"/"}> <li className="mx-1 px-4">Home </li></NavLink>
          <NavLink to={"/"}> <li className="mx-1 px-4">Home </li></NavLink>
        </ul>
          {!isLoggedIn && 
        <ul className='flex items-center mx-10 text-white text-lg '>
          <NavLink to={"/login"}> <li className='mx-4'>Login</li></NavLink>        
          <NavLink to={"/signUp"}> <li className='mx-4'>Sign Up</li></NavLink>
        </ul>}
        {isLoggedIn && <ul className='flex items-center mx-10 text-white text-lg'>
          <NavLink to={"/profile"}> <li className='mx-4'>Profile</li></NavLink>      
          </ul>}
      </div>
    </header>
  );
}

export default Header;