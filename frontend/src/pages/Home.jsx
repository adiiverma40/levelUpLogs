import React, { useEffect } from 'react';
import { Container } from '../components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const selector = useSelector((state) => state.user)
  const navigate = useNavigate()
  
  useEffect(()=>{
    if (selector.isLoggedIn) {
      console.log("welcome Home!");
      
    } else {
      navigate("/login")
    }
  }, [selector.isLoggedIn])
 
  return (
    <div>
      <Container flex={false}>

      Home
      </Container>
    </div>
  );
}

export default Home;