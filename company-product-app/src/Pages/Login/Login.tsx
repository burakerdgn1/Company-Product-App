import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import './Login.css';

interface LoginProps{
  setIsLoggedIn:(isLoggedIn:boolean)=>void;
}

function Login({setIsLoggedIn}:LoginProps) {
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    username:'',
    password:''
  })
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;
    setFormData({
      ...formData,
      [name]:value,
    });
  }
  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault();


    if (!formData.username || !formData.password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    if (formData.username.length < 6 || formData.password.length<6|| formData.password.length > 12) {
      setErrorMessage('Username must be between 6 and 12 characters.');
      return;
    }

    else{
      try {
        const response = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('secret-key', data.token); // Store the JWT token in local storage
          setIsLoggedIn(true);
          navigate('/');
        } else {
          setErrorMessage('Invalid username or password.');
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrorMessage('An error occurred while logging in.');
      }
    }


  }

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <input className="login-input"
          type="text"
          placeholder="Username"
          name="username"
          defaultValue={formData.username}
          onChange={handleChange}
        />
        <input className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          defaultValue={formData.password}
          onChange={handleChange}
        />
        <button className="log-button" type="submit">Login</button>
        <br />
        <br />
        <button className="register-button" type="button" onClick={()=>navigate("/register")} >Register</button>
      </form>
    </div>
  );

}

export default Login;