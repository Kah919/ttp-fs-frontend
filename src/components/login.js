import React, { Component} from "react";
import {Form, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';


class Login extends Component {
  render() {
    return(
      <div className="login_container">
        <h1 className="header"> TTP Sign In</h1>
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Control type="email" placeholder="Enter Email" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>

        <Button variant="primary" type="submit">
         Submit
        </Button>
      </div>
    )
  }
}

export default Login
