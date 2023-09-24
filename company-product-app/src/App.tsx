/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';
import React, { useEffect, useState } from 'react';
import Homepage from './Pages/HomePage/Homepage';
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Companies from './Pages/Companies/Companies';
import Products from './Pages/Products/Products';


interface AppProps {
  name: string;
}


function App(props: AppProps) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const isLoggedInInStorage = localStorage.getItem('isLoggedIn');
    return isLoggedInInStorage ? JSON.parse(isLoggedInInStorage) : false;

  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  }

  return (

    <div>
      <nav>
        <ul>
          {isLoggedIn && (
            <div>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/companies">Companies</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </div>
          )}
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Homepage /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/companies" element={<Companies />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}></Route>
      </Routes>
    </div>

  );
}

export default App;
