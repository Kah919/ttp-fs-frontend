import React, { Component } from "react";
import { connect } from "react-redux";
// import {Form, Button} from 'react-bootstrap';
import Owned from './owned';
import Purchase from './purchase';


class Portfolio extends Component {
  render() {
    return(
      <div className="portfolio_container">
        <div className="portfolio_split">
          <div className="owned">
            <Owned />
          </div>

          <div className="buying">
            <Purchase />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log("inside mapStateToProps", state)
  return {
    user: state.user
  }
}


export default connect(mapStateToProps)(Portfolio);
