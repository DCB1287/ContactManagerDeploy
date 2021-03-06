import React from 'react'
import { Button, Form, Icon, Message, Segment, Container } from 'semantic-ui-react'
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
  window.location.href = '/contacts'
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
        // "https://still-stream-56632.herokuapp.com/"
        const url = "https://floating-island-33074.herokuapp.com/api/users/add"               //This URL will need to be changed        floating-island-33074 
        const payload = { ...user} 
        console.log(payload)
        const response = await axios.post(url, payload)          //Call the API to post the user data from the form.
        handleLogin(response.data)
        }

        catch (error) {
          //catchErrors(error, setError);
          setError(error.response.data.msg)
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
    <Container style={{'padding-top':'10px'}}>
    <Message 
      attached
      icon="settings"
      header="Get Started!"
      content="Create a new account"
      color="teal"
    />
    <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}> 
      <Message 
        icon="frown outline"
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
    </Container>
    </>
    )
}

export default Signup;