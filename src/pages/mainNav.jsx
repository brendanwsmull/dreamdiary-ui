import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/header.jsx';
import ViewDreams from './viewDreams.jsx';
import CreateDreams from './createDreams.jsx';
// import './MainNav.css';

export function MainApp() {
  return (
    <div className="container">
      <Header />
      <div className="navStuff">
        <Routes>
          <Route path="/" element={<Navigate to="dreams" replace />} />
          <Route path="dreams" element={<ViewDreams />} />
          <Route path="newDream" element={<CreateDreams />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainApp;
