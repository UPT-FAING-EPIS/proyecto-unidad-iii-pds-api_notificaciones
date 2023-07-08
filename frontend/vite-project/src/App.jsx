import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function MyComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3000'); // URL y puerto del servidor backend

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Renderiza los mensajes recibidos */}
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}

export default MyComponent;