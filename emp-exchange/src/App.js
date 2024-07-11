import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
    <div className="App">
     <Switch>
      <Route path="/" exact component={LandingPage}/>
      <Route path="/products" component={""}/>
      <Route path ="/search" component={""}/>
      <Route path = "/category/:category" component={""}/>
      <Route path ="/product/:id" component={""}/>
     </Switch>
      </div>
    </Router>
  );
};

export default App;
