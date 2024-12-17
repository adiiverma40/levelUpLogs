import React from 'react';
import { NavLink } from "react-router-dom"
function Header() {
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
        <ul className='flex items-center mx-10 text-white text-lg '>
          <NavLink to={"/login"}> <li className='mx-4'>Login</li></NavLink>        
          <NavLink to={"/signUp"}> <li className='mx-4'>Sign Up</li></NavLink>
        </ul>
      </div>
    </header>
  );
}

export default Header;