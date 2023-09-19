import React, { useState } from "react";
import './Login.css';

function Login() {
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
  const handleLogin = (e:React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    if (formData.username.length < 6 || formData.password.length > 12) {
      setErrorMessage('Username must be between 6 and 12 characters.');
      return;
    }

    if (formData.username.length < 6 || formData.password.length > 12) {
      setErrorMessage('Password must be between 6 and 12 characters.');
      return;
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
          defaultValue={formData.username}
          onChange={handleChange}
        />
        <input className="login-input"
          type="password"
          placeholder="Password"
          defaultValue={formData.password}
          onChange={handleChange}
        />
        <button className="login-button" type="submit">Login</button>
        <br />
        <br />
        <button className="register-button" type="button">Register</button>
      </form>
    </div>
  );

}

export default Login;