import React, { Component } from "react";
import { connect } from "react-redux";
import StocksList from "./stocksList"

class Owned extends Component {

  ownedStocks = () => {
    let stocks = {}
    if(this.props.user.stocks) {
      this.props.user.stocks.forEach(stock => {
        if(stocks[stock.ticker]) {
          stocks[stock.ticker] += 1
        } else {
          stocks[stock.ticker] = 1
        }
      })
    }
    if(Object.keys(stocks).length !== 0) {
      return <StocksList stocks={stocks} />
    }
  }

  render() {
    return(
      <div>
        <div className="owned_stock_container">
          {this.ownedStocks()}
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

export default connect(mapStateToProps)(Owned);
