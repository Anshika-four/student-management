import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      setError('Failed to log in: ' + error.message);
    }
  };

  return (
    
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        
        
          <div className="inputs">
            <input
              type="email"
              placeholder="Email"
              className ="field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
             
              required
            />
          
          
            <input
              type="password"
              placeholder="Password"
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            
              required
            />
            <div className="d-grid">
        <button type="submit" className="button-form">
          Submit
        </button>
        </div>
      </div>
      <p className="register-link">
        New user <a href="/register">Register Here</a>
      </p>
          
          
        </form>         
        
      
    
  );
};

export default LoginPage;
