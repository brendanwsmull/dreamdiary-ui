import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    console.log("create account button clicked");
    navigate('/');
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Create Account</h1>
      <p>Enter your username below</p>
      <input
        type="text"
        placeholder="Enter a Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <p>Enter your password below</p>
      <input
        type="password"
        placeholder="Enter a Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button onClick={handleCreateAccount} className="login-button">
        Create Account
      </button>
    </div>
  );
}

export default CreateAccount;