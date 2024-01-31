import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import CarGrid from '../components/CarGrid';
import RabbitMQConsumer from '../amq/RabbitMQConsumer';
import { useNavigate } from 'react-router-dom';
import { Button, VStack, Text } from '@chakra-ui/react';

const Home = () => {

  const cookies = new Cookies(null, { path: '/' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  useEffect(()=>{
    const token = cookies.get("accessToken")
    const islogin = token?true:false
    setIsLoggedIn(islogin)
  }, [])

  return (
    <>
    {isLoggedIn?<div>Car Page
      <RabbitMQConsumer></RabbitMQConsumer>
      <CarGrid></CarGrid>
    </div>
    :<VStack>
        <Text>Not Logged in</Text>
        <Button onClick={()=>navigate('/')}>Go back to log in</Button>
      </VStack>}
    </>
  )
}

export default Home