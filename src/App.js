import React, { Component } from 'react';
import Login from './components/login';
import Register from './components/register';
import Portfolio from './components/portfolio';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { usernameFetch } from "./Redux/actions";
import { Provider, connect } from "react-redux";

class App extends Component {

  componentDidMount = () => {
    this.props.usernameFetch()
  }

  render(){
    return (
      <div>
          <Router>
              <Switch>
                <Route path="/portfolio" render={() => <Portfolio />} />
                <Route path="/register" render={() => <Register />} />
                <Route path="/login" render={() => <Login />} />
                <Route path="/" render={() => <Login />} />
              </Switch>
          </Router >
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    usernameFetch: () => dispatch(usernameFetch())
  }
}

const mapStateToProps = (state) =>{
  console.log("from app", state)
  return{
    user: state.name
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
