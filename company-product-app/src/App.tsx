import './App.css';
import React from 'react';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Companies from './Pages/Companies/Companies';
import Products from './Pages/Products/Products';

interface AppProps{
  name:string;
}

function App(props:AppProps) {
  return (
     //<Register></Register>
    //<Login></Login>
    //<Companies></Companies>
    <Products></Products>
  );
}

export default App;
