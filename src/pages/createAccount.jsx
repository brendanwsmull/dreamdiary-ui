import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function CreateAccount() {
  const baseURL = 'http://localhost:4000';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    console.log("create account button clicked");
    if (!username || !password) {
      alert('Please enter both username and password!');
      return 
    }

    const res = await fetch(`${baseURL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      alert("Error when creating your account, username may already be in use!");
      return;
    }

    const data = await res.json();     // { user: <user_id> }
    alert("Account created!");
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