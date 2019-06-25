import React, { Component } from "react";
import {Form, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';


class Register extends Component {
  render() {
    return(
      <div className="login_container">
        <h1 className="header"> Register </h1>
        <Form>

          <Form.Group controlId="formBasicName">
            <Form.Control type="text" placeholder="Name"/>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default Register;
