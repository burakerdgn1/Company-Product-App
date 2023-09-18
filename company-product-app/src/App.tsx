import './App.css';
import React from 'react';
import Login from './Pages/Login/Login';

interface AppProps{
  name:string;
}

function App(props:AppProps) {
  return (
    <Login></Login>
  );
}

export default App;
