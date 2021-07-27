import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import 'animate.css'
import Rental from './pages/Rental';
import NavBar from './components/NavBar/NavBar';
import LogInOrSignUpForm from './components/NavBar/LogInOrSignUpForm/LogInOrSignUpForm';
import '@fontsource/roboto';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentUser, saveCurrentUser } from './redux/user.slices/user.slices';
import { Backdrop, Container, LinearProgress } from '@material-ui/core';
import { RootState } from './redux/root-reducer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import feathersClient from './API/feathersClient';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import HostARental from './pages/HostARental';

function App() {
  const dispatch = useDispatch()
  const { isFetching } = useSelector((state: RootState) => state.fetching)

  useEffect(() => {
    feathersClient.authenticate()
      .catch(() => dispatch(clearCurrentUser()))
    feathersClient.on('login', (resp) => dispatch(saveCurrentUser(resp.user)))
    feathersClient.on('logout', () => dispatch(clearCurrentUser()))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ErrorBoundary>
      <div className="App">
        <NavBar />
        <div className='App-body'>
        <Switch>
          <Route path='/rentals'>
            <Rental />
          </Route>
          <Route path='/' exact>
            <Home />
          </Route>
        </Switch>
        </div>
        <LogInOrSignUpForm />
        <Backdrop open={isFetching} className='App-backdrop' style={{ zIndex: 1300 }}>
          <LinearProgress color='secondary' />
        </Backdrop>
      </div>
    </ErrorBoundary>
  );
}

export default App;
