//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';

function App() {
  return (
   
    <div className="App">
       <Routes>
            <Route path="/" element ={<LandingPage/>}/>
            {/* <Route path="/products" component={""}/>
            <Route path ="/search" component={""}/>
            <Route path = "/category/:category" component={""}/>
            <Route path ="/product/:id" component={""}/> */}
        </Routes>
      </div>
  );
}

export default App;
