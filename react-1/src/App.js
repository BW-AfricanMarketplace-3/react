import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import { CssBaseline } from '@material-ui/core';
import Navbar from './components/Navbar';

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Navbar />
      <Route exact path='/signup'>
        <SignUp />
      </Route>
    </Fragment>
  );
}

export default App;
