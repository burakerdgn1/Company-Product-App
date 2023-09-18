import React, { useState } from "react";
import './Login.css';

function Login(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const handleLogin=()=>{}

    return (
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          <input className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
      );

}

export default Login;