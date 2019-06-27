import React, { Component} from "react";
import {Form, Button} from 'react-bootstrap';
import Register from "./register";
import Portfolio from "./portfolio";
import { Link, Redirect} from "react-router-dom";
import { loginFetch } from "../Redux/actions";
import { connect } from "react-redux";



class Login extends Component {
  state = {
    email: "",
    password: "",
    redirect: false
  }

  user_input = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  loginFetch = event => {
    event.preventDefault()

    this.props.loginFetch(this.state);

    if(localStorage.token) {
        this.setState({
          redirect: true
        })
    }
  }

  render() {
    if(localStorage.token) {
      return <Redirect to="/portfolio" />
    }

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

        <div className="redirect_link"><Link to="/register">Don't have an account?</Link></div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => { // mapDispatchToProps sends info, arg of dispatch
  console.log("this is from dispatch", dispatch)
  return { // returns and object usually name of what you want to return as a key
    loginFetch: (loginInfo) => dispatch(loginFetch(loginInfo)), // dispatch the imported data ususally same as key before
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
