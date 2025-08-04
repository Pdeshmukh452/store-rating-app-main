import React, { useState } from 'react';
import axios from 'axios';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '' });

  const handleSignup = async () => {
    try {
      await axios.post(import.meta.env.VITE_API_URL + '/api/signup', form);
      alert('Signup successful');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} /><br/>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} /><br/>
      <input placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} /><br/>
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} /><br/>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
