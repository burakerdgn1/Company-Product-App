import React, { useRef, useState } from 'react';
import './Register.css'; 

import { useNavigate } from 'react-router-dom';

function Register() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (formData.username.length < 6 || formData.username.length > 12) {
      setErrorMessage('Username must be between 6 and 12 characters.');
      return;
    }

    if (formData.password.length < 6 || formData.password.length > 12) {
      setErrorMessage('Password must be between 6 and 12 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('An error occurred during registration.');
    }
    
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleRegister} ref={formRef}>
        <input
          className="register-input"
          type="text"
          placeholder="Username (6-12 characters)"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          className="register-input"
          type="password"
          placeholder="Password (6-12 characters)"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          className="register-input"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit" className="reg-button">
          Register
        </button>
        <br />
        <br />
        <button type="button" className="login-button" onClick={()=>navigate('/login',{replace:true})}>
          Login Page
        </button>
      </form>
    </div>
  );
}

export default Register;