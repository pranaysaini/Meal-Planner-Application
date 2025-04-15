import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({username, email, password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        navigate('/');
      } else {
        alert('Registration failed');
      }
    } catch (err) {
      console.error('Register error:', err);
    }
  };

  return (
    // <form onSubmit={handleRegister}>
    //   <h2>Register</h2>
    //   <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
    //   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
    //   <button type="submit">Register</button>
    // </form>

        <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
  );
};

export default Register;
