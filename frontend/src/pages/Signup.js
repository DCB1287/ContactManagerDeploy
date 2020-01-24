import React from 'react'
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'
import cookie from "js-cookie"

const INITIAL_USER = {
  username: "",
  password: "",
  passwordVerify: "",
  email: ""
  
}
//This will give the user a token we can track and navigate to the contacts page
function handleLogin(token) {
  cookie.set("token", token);
  //window.location.href = '/contacts'
}

function catchErrors(error, displayError) {
  let errorMsg;
  if (error.response) {
    // The request was made and the server responsed with a status code that is not in the range of 2XX
    errorMsg = error.response.data;
    console.error("Error response", errorMsg);

    // For Cloudinary image uploads
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    // The request was made, but no response was received
    errorMsg = error.request;
    console.error("Error request", errorMsg);
  } else {
    // Something else happened in making the request that triggered an error
    errorMsg = error.message;
    console.error("Error message", errorMsg);
  }

}

function Signup() {
  const [user, setUser] = React.useState(INITIAL_USER)
  const [disabled, setDisabled] = React.useState("true")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')


  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el)) 
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  function handleChange(event) {
     const { name, value } = event.target
     setUser(prevState => ({...prevState, [name]: value }) ) 
  }

  function passwordCompare(p1,p2){

    return p1.localeCompare(p2);

  }

  async function handleSubmit(event) {

    event.preventDefault()

    if(passwordCompare(user.password, user.passwordVerify) === 0){

      try {
        setLoading(true)
        setError('');
        const url = "http://localhost:3000/users/add"               //This URL will need to be changed         
        const payload = { ...user} 
        console.log(user)
        const response = await axios.post(url, payload)          //Call the API to post the user data from the form.
        handleLogin(response.data)
        }

        catch (error) {
          catchErrors(error);
        }

        finally {
          setLoading(false)
        }
    }   

    else {
      // need to add react error message regarding passwords here
      setError("Passwords do not match.")
    }
  }


  return (
    <>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"/>
    <Message 
      attached
      icon="settings"
      header="Get Started!"
      content="Create a new account"
      color="teal"
    />
    <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}> 
      <Message 
        error
        header="Error!"
        content={error}
      />
      <Segment>
        <Form.Input 
          fluid
          icon="user"
          iconPosition="left"
          label="Name"
          placeholder="Name"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <Form.Input 
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <Form.Input 
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          label="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
          <Form.Input 
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Re-Type Password"
          label="Re-Type Password"
          name="passwordVerify"
          type="password"
          value={user.passwordVerify}
          onChange={handleChange}
        />
        <Button
          disabled={disabled || loading}
          icon="signup"
          type="submit"
          color="orange"
          content="Signup"
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help" />
      Already a user?{" "}
      <a href="/login">Log in here</a>
    </Message>
    </>
    )
}

export default Signup;