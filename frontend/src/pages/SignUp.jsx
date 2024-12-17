import React, { useState } from 'react';
import { Button, Container, Input } from '../components';
import { NavLink } from 'react-router-dom';

function SignUp() {
  const [buttonClicked , SetButtonClicked] = useState("Sign Up")
  const [toggleButton , setToggelButton] = useState(false)
  const onButtonClick=()=>{
    if(!toggleButton){
      SetButtonClicked('Signing......')

    }else{
      SetButtonClicked('Sign Up')
    }
    setToggelButton(prevState => !prevState)
  }
  return (
    <Container flex={false}>
    <div className='h-3/5 w-1/2 mx-auto rounded-lg shadow-xl shadow-slate-800 px-10 py-3'>
      <span className='font-bold text-xl font-serif text-center block'>Sign Up </span>
      <hr className='my-3' />
      <div className='flex'>
      <form action="" className='w-1/2'>
        <Input label="Name" placeholder="Enter your name"/>
        <Input type={"email"} label="Email" placeholder="Enter your Email"/>
        <Input type={"password"} label="Password" placeholder="Enter your Password"/>
      </form>
      <form action="" className='w-1/2'>
        <Input label="Current Weight" placeholder="Enter your Weight(In KGs)" type={"number"} />
        <Input label="DOB" placeholder="Enter your DOB" type={"date"} />
        <Button onClick={onButtonClick}>{buttonClicked}</Button>
      </form>
      </div>
      <span className='block text-center'>Already have a account?<NavLink to={"/login"} className="text-blue-700 hover:cursor-pointer"> Login!</NavLink></span>
    </div>
    </Container>
  );
}

export default SignUp;