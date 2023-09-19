import './App.css';
import React from 'react';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

interface AppProps{
  name:string;
}

function App(props:AppProps) {
  return (
     <Register></Register>
    //<Login></Login>
  );
}

export default App;
