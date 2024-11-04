import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Join from "./components/join/Join";
import Chat from "./components/Chat/Chat";
import React, { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("user");

  useEffect(() => {
    if (!userName) {
      navigate('/');
    }
  }, [userName, navigate]); // Depend on userName and navigate to run only when they change

  return (
    <>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={userName ? <Chat /> : <Join />} />
      </Routes>
    </>
  );
}

export default App;
