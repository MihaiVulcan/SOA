
import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs'
import {useToast} from '@chakra-ui/react'


const RabbitMQConsumer = () => {
  const [messages, setMessages] = useState();

  const toast = useToast();

    useEffect(()=>{
        var ws = 'ws://127.0.0.1:15674/ws';

        const headers = {
            'login': 'guest',
            'passcode': 'guest',
            'durable': 'true',
            'auto-delete': 'false'
        }
    
        var client = Stomp.client(ws);
    
        var on_connect = function(x) {
            var id = client.subscribe("/topic/notification", function(d) {
                 console.log(d.body);
                 var obj = JSON.parse(d.body);
                 console.log(obj);
                 switch(true){
                  case obj.action=="new car":
                    toast({
                      title: obj.action + " " + obj.producer + " " + obj.model,
                      status: 'info', 
                      duration: 3000,
                      isClosable: true,
                    })
                    break;
                  case obj.action=="deleted car":
                    toast({
                      title: obj.action + " " + obj.producer + " " + obj.model,
                      status: 'error', 
                      duration: 3000,
                      isClosable: true,
                    })
                    break;
                  case obj.action=="updated car":
                    toast({
                      title: obj.action + " " + obj.producer + " " + obj.model,
                      status: 'info', 
                      duration: 3000,
                      isClosable: true,
                    })
                    break;
                 }
            });
        };
        var on_error =  function() {
            console.log('error');
          };
    
        client.connect("guest", "guest", on_connect, on_error, '/');
    }, [])
    return(
      <div></div>
    );
};

export default RabbitMQConsumer;
