import './App.css';
import React, { useState } from 'react';
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostPage from './pages/PostPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SupportConfirmation from './pages/SupportConfirmation';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/support" element={<SupportConfirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
