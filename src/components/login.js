import React, { Component} from "react";
import {Form, Button} from 'react-bootstrap';


class Login extends Component {
  state = {
    email: "",
    password: ""
  }

  user_input = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  loginFetch = event => {
    event.preventDefault()
    fetch("http://localhost:3000/api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accepts: "application/json"
          },
          body: JSON.stringify({
            user: {
              email: this.state.email,
              password: this.state.password
            }
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
            if(data.user) {
              localStorage.setItem("token", data.jwt);
              console.log("data from action", data)
              alert(`Welcome back ${data.user.name} 🥢`)
            } else {
              alert("No existing user")
            }
        })
  }

  render() {
    console.log(this.state)
    return(
      <div className="login_container">
        <h1 className="header"> Sign In</h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" name="email" placeholder="Email" onChange={this.user_input} value={this.state.email}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" name="password" placeholder="Password" onChange={this.user_input} value={this.state.password}/>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.loginFetch}> Submit </Button>

        </Form>
      </div>
    )
  }
}

export default Login
