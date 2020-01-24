import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contacts from './pages/Contacts'

function App() 
{

  return (
    <>
    <Container>
    <Router >
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/contacts" >
          <Contacts />
        </Route>
        <Redirect to="/" />        
      </Switch>  
    </Router>
    </Container>
    </>
  );
}

export default App;
