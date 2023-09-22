/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';
import React from 'react';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Companies from './Pages/Companies/Companies';
import Products from './Pages/Products/Products';
import Homepage from './Pages/HomePage/Homepage';
import {dummyCompanies} from './Pages/Companies/Companies';
import {dummyProducts} from './Pages/Products/Products';

interface AppProps{
  name:string;
}

function App(props:AppProps) {
  return (
     //<Register></Register>
    //<Login></Login>
    //<Companies></Companies>
    //<Products></Products>
    <div>
      <Homepage companies={dummyCompanies} products={dummyProducts}/>
    </div>
    
  );
}

export default App;
