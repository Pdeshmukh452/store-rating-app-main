import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = () => {
    axios
      .post(import.meta.env.VITE_API_URL + '/api/login', {
        email,
        password
      })
      .then((res) => {
        
        localStorage.setItem('token', res.data.token);

        
        localStorage.setItem('userId', res.data.user.id);
        localStorage.setItem('role', res.data.user.role);

        
        navigate('/dashboard');
      })
      .catch((err) => {
        alert('Login failed: ' + err.response?.data?.error || 'Unknown error');
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={login} style={{ width: '100%' }}>
        Login
      </button>
    </div>
  );
}
