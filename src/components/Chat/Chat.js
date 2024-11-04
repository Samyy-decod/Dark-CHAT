import React, { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import "./Chat.css";
import { user } from "../join/Join";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sendLogo from "../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../images/danger (1).png";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.svg"
import welcomeAudioFile from "../images/wellcome.m4a";

const ENDPOINT = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/' 
  : 'http://192.168.29.64:5000';

let socket;
let welcomeAudio;

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
 

  const navigate = useNavigate();

  // Send message to server
  const send = () => {
    const message = document.getElementById('chatInput').value;
    if (message) {
      socket.emit('message', { message, id });
      document.getElementById('chatInput').value = "";
    }
  };
 

 
  useEffect(() => {

    if (!welcomeAudio) {
      welcomeAudio = new Audio(welcomeAudioFile);
      welcomeAudio.play();
    }

    // Connect to the socket
    socket = socketIo(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

    // Socket connection confirmation
    socket.on('connect', () => {
      toast.success('Connected to the chat!');
      setId(socket.id);
      console.log('Connected');
    });

    
if (user) {
  // Emit the join event only if user is not blank
  socket.emit('joined', { user });

  // Listen for welcome message only if user exists
  socket.on('wellcome', (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  });



    // Listen for user join event
    socket.on('userJoined', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Listen for user leave event
    socket.on('leave', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Listen for incoming messages
    socket.on('sendMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    
} else {
  navigate('/');
}



    // Clean up on unmount
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="chatPage">
        <div className="chatContainer">
          <div className="header">
            <img src={logo} alt='logo'id="logo"/> 
            <a href="/"> <img src={closeIcon} alt="Close" id="img" /></a>
          </div>

          <ReactScrollToBottom className="chatBox">
            {messages.map((item, i) => (
              <Message
                key={i}
                user={item.id === id ? '' : item.user}
                message={item.message}
                classs={item.id === id ? 'right' : 'left'}
              />
            ))}
          </ReactScrollToBottom>

          <div className="inputBox">
            <input type="text" id="chatInput" onKeyPress={(e)=>e.key ==="Enter"? send():null}/>
            <button className="sendBtn" onClick={send} >
              <img src={sendLogo} alt="Send" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
