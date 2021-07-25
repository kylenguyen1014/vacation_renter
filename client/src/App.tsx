import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import 'animate.css'
import Rental from './pages/Rental';
import NavBar from './components/NavBar/NavBar';

function App() {

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path='/rental'>
          <Rental />
        </Route>
        <Route path='/' exact>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
