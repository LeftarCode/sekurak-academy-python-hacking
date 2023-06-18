import './App.css';
import React, { useState } from 'react';
import Home from './pages/Home'
import { HashRouter, Routes, Route } from "react-router-dom";
import PostPage from './pages/PostPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SupportConfirmation from './pages/SupportConfirmation';

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/support" element={<SupportConfirmation />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
