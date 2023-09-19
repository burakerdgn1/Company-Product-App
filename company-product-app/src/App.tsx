import './App.css';
import React from 'react';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Companies from './Pages/Companies/Companies';

interface AppProps{
  name:string;
}

function App(props:AppProps) {
  return (
     //<Register></Register>
    //<Login></Login>
    <Companies></Companies>
  );
}

export default App;
