import React, { Component } from "react";

class StocksList extends Component {
  state = {
    stocks: []
  }

  // latestPriceFetch = ticker => {
  //   return fetch(`https://sandbox.iexapis.com/stable/stock/${ticker}/quote?token=Tpk_f0480a3b576c4f7e9da28303a3d72ff6`, {
  //     method: "GET",
  //     headers: {
  //       "Accept" : "application/json",
  //       "Content-Type" : "application/json"
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //     })
  // }
  componentDidMount = () => {
    if(Object.keys(this.props.stocks).length !== 0) {
      let ticker = []
      for(let key in this.props.stocks) {
        ticker.push(key)
      }
      ticker = ticker.join()

      return fetch(`https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${ticker}&types=quote&range=1m&last=5&token=Tpk_f0480a3b576c4f7e9da28303a3d72ff6`, {
          method: "GET",
          headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            let arr = []
            let color = ""
            for(let key in data) {
              let shares = 0;
              if(this.props.stocks.hasOwnProperty(key)) {
                shares = this.props.stocks[key]
              }

              if(data[key].quote.latestPrice > data[key].quote.open) {
                color = "green"
              } else if(data[key].quote.latestPrice > data[key].quote.open) {
                color = "red"
              } else {
                color = "gray"
              }

              arr.push({[key]: {
                price: data[key].quote.latestPrice,
                shares: shares,
                difference: color
              }})
            }

            this.setState({
              stocks: arr
            })
          })
    }
  }

  stockRow = () => {
    console.log("STATE",this.state.stocks)
  }

  render() {
    console.log(this.state)

    return(
      <div className="stock_row_container">
        {this.stockRow()}
      </div>
    )
  }
}

export default StocksList;
