import React, { useState } from 'react';
import { Button, Container, Input } from '../components';
import { NavLink } from 'react-router-dom';

function Login() {
  const [buttonClicked , SetButtonClicked] = useState("Login")
  const [toggleButton , setToggelButton] = useState(false)
  const onButtonClick=()=>{
    if(!toggleButton){
      SetButtonClicked('Logging in......')

    }else{
      SetButtonClicked('Sign Up')
    }
    setToggelButton(prevState => !prevState)
  }
  return (
    <Container flex={false}>

<div className='h-3/5 w-1/2 mx-auto rounded-lg shadow-xl shadow-slate-800 px-10 py-3'>
      <span className='font-bold text-xl font-serif text-center block'>Login</span>
      <hr className='my-3' />
      <div className='w-3/4 mx-auto'>
      <form action="" className='w-full '>
        <Input type={"email"} label="Email" placeholder="Enter your Email"/>
        <Input type={"password"} label="Password" placeholder="Enter your Password"/>
        <Button className='w-44' onClick={onButtonClick}>{buttonClicked}</Button>
      </form>
     
      </div>
      <span className='block text-center mt-4'>Don't have a account?<NavLink to={"/signUp"} className="text-blue-700 hover:cursor-pointer"> Sign Up!</NavLink></span>
    </div>
    </Container>
  );
}

export default Login;