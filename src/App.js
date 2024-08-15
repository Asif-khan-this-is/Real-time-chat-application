import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  const user = localStorage.getItem("token");
  console.log("token",user)
  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<SignUp />} />
      <Route path="/login" exact element={<Login />} />
      {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
    </Routes>
  );
}

export default App;
