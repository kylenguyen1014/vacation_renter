import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import 'animate.css'
import Rental from './pages/Rental';
import NavBar from './components/NavBar/NavBar';
import LogInOrSignUpForm from './components/NavBar/LogInOrSignUpForm/LogInOrSignUpForm';
import '@fontsource/roboto';
import { useDispatch } from 'react-redux';
import { clearCurrentUser, saveCurrentUser } from './redux/user.slices/user.slices';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import feathersClient from './API/feathersClient';
import { ReactQueryDevtools } from "react-query/devtools";
import LoadingBackDrop from './components/LoadingBackDrop/LoadingBackDrop';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      // onError: (err) => {
      //   Toast.error(errorMessageReturn(err))

      // },
    },
  }
})

function App() {
  const dispatch = useDispatch()
  // const isQueryFetching = useIsFetching()

  useEffect(() => {
    feathersClient.authenticate()
      .catch(() => dispatch(clearCurrentUser()))
    feathersClient.on('login', (resp) => dispatch(saveCurrentUser(resp.user)))
    feathersClient.on('logout', () => dispatch(clearCurrentUser()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
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
          <LoadingBackDrop />
          <ReactQueryDevtools initialIsOpen />
        </div>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
