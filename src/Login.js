import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('http://localhost:3001/login', { email, password });
      const user = localStorage.getItem('user');
      console.log('user', user);
      if (user) {
        const {email: loginEmail, password: loginPassword, username} = JSON.parse(user);
        console.log(loginEmail, loginPassword, username)
        if (email === loginEmail && password === loginPassword) {
          localStorage.setItem('username', username); // Kullanıcı adını sakla
          navigate('/dashboard');
        } else {
          throw new Error("Login failed. Umut");
        }
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
      console.log(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
