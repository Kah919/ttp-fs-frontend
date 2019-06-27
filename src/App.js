import React from 'react';
import Login from './components/login';
import Register from './components/register';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div>
        <Router>
            <Switch>
              <Route path="/register" render={() => <Register />} />
              <Route path="/login" render={() => <Login />} />
              <Route path="/" render={() => <Login />} />
            </Switch>
        </Router >
      </div>
  );
}

export default App;
