import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import {logout} from "../Store/Slices/UserSlice.js" 
import axios from "axios";
function Header() {
  const selector = useSelector((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (selector.isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [selector.isLoggedIn]);
  async function logoutUser() {
    console.log("logout");
    const response = await axios.get("http://localhost:3000/api/logout", { withCredentials: true });
    console.log(response);
    if(response.data.message === "Refresh token cleared"){
      navigate("/login")
      alert("Logged out successfully");
      dispatch(logout())
    }
    
    
  }
  return (
    <header className="h-14 " style={{ backgroundColor: "#2A2E45" }}>
      <div className="h-full w-full flex justify-between align-center">
        <ul className="flex items-center  text-white text-lg font-semibold hover:cursor-pointer">
          <NavLink to={"/"}>
            <li className="mx-1 px-4">Home </li>
          </NavLink>
          <NavLink to={"/"}>
            <li className="mx-1 px-4">Home </li>
          </NavLink>
          <NavLink to={"/"}>
            <li className="mx-1 px-4">Home </li>
          </NavLink>
          <NavLink to={"/"}>
            <li className="mx-1 px-4">Home </li>
          </NavLink>
          <NavLink to={"/"}>
            <li className="mx-1 px-4">Home </li>
          </NavLink>
        </ul>
        {!isLoggedIn && (
          <ul className="flex items-center mx-10 text-white text-lg ">
            <NavLink to={"/login"}>
              <li className="mx-4">Login</li>
            </NavLink>
            <NavLink to={"/signUp"}>
              <li className="mx-4">Sign Up</li>
            </NavLink>
          </ul>
        )}
        {isLoggedIn && (
          <ul className="flex items-center mx-10 text-white text-lg">
            <NavLink to={"/profile"}>
              <li className="mx-4">Profile</li>
            </NavLink>
            <li onClick={logoutUser} className="mx-4 border-white border-2 hover:cursor-pointer font-semibold font-serif text-lg
             shadow-white shadow-sm p-2 rounded-xl transition duration-200 ease-in-out hover:bg-gray-400 ">
              Logout
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
