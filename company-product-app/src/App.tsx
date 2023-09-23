/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';
import React, { useState } from 'react';
import Homepage from './Pages/HomePage/Homepage';
import Companies, { dummyCompanies } from './Pages/Companies/Companies';
import Products, { dummyProducts } from './Pages/Products/Products';
import { Route, BrowserRouter as Router, Routes, Link, useNavigate } from "react-router-dom";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

interface AppProps {
  name: string;
}


function App(props: AppProps) {
  const navigate = useNavigate();
  const handleLogout=()=>{
    setIsLoggedIn(false);
    navigate('/login');
   }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (

    <div>
      <nav>
        <ul>
          {
            isLoggedIn ? <li>
              <Link to="/">Home</Link>
            </li> : null
          }

          {isLoggedIn ? <li>
            <Link to="/companies">Companies</Link>
          </li> : null}

          {isLoggedIn ? <li>
            <Link to="/products">Products</Link>
          </li> : null}
          {isLoggedIn ? (
            <li>
              <Link to="/login" onClick={handleLogout}></Link>
              { <button onClick={() => navigate('/login')}>Logout</button> }
            </li>
          ) : null}
        </ul>
      </nav>
      <Routes>

        <Route
          path="/"
          element={isLoggedIn ? <Homepage companies={dummyCompanies} products={dummyProducts} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
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
