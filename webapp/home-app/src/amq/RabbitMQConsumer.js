
import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs'


const RabbitMQConsumer = () => {
  const [messages, setMessages] = useState();

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
                 setMessages(obj);
            });
        };
        var on_error =  function() {
            console.log('error');
          };
    
        client.connect("guest", "guest", on_connect, on_error, '/');
    })

  return (
    <div>
      <h2>Received Messages:</h2>
      <ul>
            { messages?(
                messages.map((value, index) => {
                    <div>{value} + " " + {index}</div>
                })
            ) : (
                <div></div>
            )}
        
      </ul>
    </div>
  );
};
export default RabbitMQConsumer;
