import React, { Component } from "react";
import Navbar from "./navbar";
import { connect } from "react-redux";

class Transaction extends Component {
  test = () => {
    if(this.props.user.transactions) {
      console.log(this.props.user.transactions)
      return this.props.user.transactions.map((stock, id) => {

        let company = this.props.user.stocks.find((data) => {
          return data.id === stock.stock_id
        })

        return(
          <div key={id}>
            <h1> BUY ({company.ticker}) - {stock.num_share} @ ${stock.price} </h1>
          </div>
        )
      })
    }
  }

  render() {
    console.log("TRANSACTION", this.props.user.transactions)
    return(
      <div>
        <div className="nav">
          <Navbar />
        </div>
        <h1> Transaction </h1>
        {this.test()}
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

export default connect(mapStateToProps)(Transaction);
