import React from 'react';
import './App.css';
import Messaging from './MsgClient';

export default function App() {
  return (
    <div className="app-container">
      <h1>Welcome to Our Sample React App</h1>
      <p>This is a simple application demonstrating the structure of a React app.</p>
      <h2>Features:</h2>
      <ul>
        <li>Component-based architecture</li>
        <li>Reusable components</li>
        <li>Easy state management</li>
      </ul>
      <Messaging /> {/* Implementing the Messaging component here */}
    </div>
  );
}
