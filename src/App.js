import './App.css';
import * as React from 'react';
import Page from './components/Page';
import SignUp from './components/registration/Registration';
import { BrowserRouter as Router, Route, Switch, Redirect, Routes } from 'react-router-dom';
import Login from './components/registration/Login';



export default function App() {


  return (
    <Routes>
      <Route path="/" element={ <Page/> } />
      <Route path="/signup" element={ <SignUp /> } />
      <Route path="/login" element={ <Login /> } />
    </Routes>

  );
}




