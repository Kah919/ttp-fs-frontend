import React, { Component } from "react";
import { connect } from "react-redux";
import {browserHistory} from 'react-router';

class Portfolio extends Component {
  render() {
    return(
      <div className="portfolio_container">
        <h1>{`Portfolio ($${this.props.user.balance})`}</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("inside mapStateToProps", state)
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Portfolio);
