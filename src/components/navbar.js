import React, { Component } from "react";
import Transaction from "./transaction";
import Portfolio from "./portfolio";
import { Link, Redirect} from "react-router-dom";


class Navbar extends Component {
  state = {
    link: ""
  }

  portfolioLink = event => {
    console.log(event.target)
    this.setState({
      link: "/portfolio"
    })
  }

  transactionLink = event => {
    this.setState({
      link: "/transaction"
    })
  }

  render() {
    if(this.state.link) {
      return <Redirect to={this.state.link} />
    }

    return(
      <div className="navbar_container">
        <li onClick={this.portfolioLink} name="portfolio">Portfolio</li>
        <li onClick={this.transactionLink} name="transaction">Transaction</li>
      </div>
    )
  }
}

export default Navbar;
