import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { UserContext } from '../components/userContext.jsx';

export default function Login() {
  // const baseURL = 'https://localhost:4000';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogin = async () => {
    console.log('Clicked Log In');
    if (!username || !password) {
      alert('Please enter both username and password!');
      return 
    }

    //I'm changing this API call slightly to make it work better on my end
    //original:
    //${baseURL}/api/account?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}
    const res = await fetch(`/users/${encodeURIComponent(username)}/${encodeURIComponent(password)}`, {
      method: 'GET'
    });

    if (!res.ok) {
      alert("Something went wrong when trying to log you in!");
      return;
    }

    const data = await res.json();
    setUser(data.user);
    navigate('/dreams/dreams')
  };

  const goToCreateAccount = () => {
    navigate('/createAccount')
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
      <p onClick={goToCreateAccount}>Create Account</p>
    </div>
  );
}
