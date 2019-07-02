import React, { Component } from "react";
import {Form, Button} from 'react-bootstrap';
import { Link} from "react-router-dom";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    redirect: false
  }

  user_input = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  signupFetch = event => {
    event.preventDefault()
    console.log(this.state.name, this.state.email, this.state.password)

    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }
      })
    })
      .then(r => r.json())
      .catch(err => console.log(err))
  }

  render() {
    return(
      <div className="login_container">
        <h1 className="header"> Register </h1>
        <Form>

          <Form.Group controlId="formBasicName">
            <Form.Control type="text" name="name" placeholder="Name" onChange={this.user_input} value={this.state.name}/>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" name="email" placeholder="Email" onChange={this.user_input} value={this.state.email}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" name="password" placeholder="Password" onChange={this.user_input} value={this.state.password}/>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.signupFetch}> Submit </Button>
        </Form>

        <div className="redirect_link"><Link to="/login" className="redirect_link">Already have an account?</Link></div>

      </div>
    )
  }
}

export default Register;
