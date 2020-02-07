import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import cookie from 'js-cookie'
import Contacts from './pages/Contacts'

var id = cookie.get('token')

function isLoggedin() {
  if (!id) { 
    return (
      <>
      <Button color="blue" href="/signup">Signup</Button>
      <Button color="blue" href="/login" >Login</Button>
      </>
    )
  } else {
    return (
      <>
      <button class="ui primary button" onClick = {handleLogout}>Logout</button>
      </>
    )
  }
}

function App() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark" > 

    <a className="navbar-brand" href="#">Contact Manager</a>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/Home">Home <span className="sr-only">(current)</span></a>
          </li>
        </ul>
        {isLoggedin()}
      </div>   
      </nav> 
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>

    <Router >
      <Switch>

        <Route path="/" exact>
          <Homepage />
        </Route>

        <Route path="/Login" exact >
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
    
    </>
    
  );
  
}

function handleLogout(){
cookie.remove("token");
window.location.href = '.Login'
}

 


export default App;