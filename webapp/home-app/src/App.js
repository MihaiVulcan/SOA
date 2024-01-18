import './App.css';
import React, { lazy, Suspense } from 'react';
import RabbitMQConsumer from './amq/RabbitMQConsumer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getUser, login, logout } from './helpers/auth_helper';
import { ChakraProvider } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'



//onst Table = lazy(() => import('TableApp/Table'));

const App = () => {

   function fgetUser(){
    getUser().then(user => {
        if (user) {
            console.log('User has been successfully loaded from store.');
        } else {
          console.log('You are not logged in.');
        }
    });
  };

  return (
    <div className="App">
      {/*<Suspense fallback={<div>Loading Header...</div>}>
        <Table text="abc" />
      </Suspense> */}
      <RabbitMQConsumer></RabbitMQConsumer> 
  <div className="container">Demo home page</div>
        {/* <BrowserRouter>
          <Routes>

          </Routes>
        </BrowserRouter> */}
    </div>
  );
}

export default App;