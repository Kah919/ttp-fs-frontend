import React, { Component } from "react";

class StocksList extends Component {
  state = {
    stocks: [],
    investment: 0
  }

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
            let investment = 0

            for(let key in data) {
              let color = ""
              let shares = 0;
              if(this.props.stocks.hasOwnProperty(key)) {
                shares = this.props.stocks[key]
                investment += shares * data[key].quote.latestPrice
              }

              if(data[key].quote.latestPrice > data[key].quote.open) {
                color = "green"
              } else if(data[key].quote.latestPrice < data[key].quote.open) {
                color = "red"
              } else {
                color = "gray"
              }

              arr.push({[data[key].quote.companyName]: {
                ticker: key,
                price: data[key].quote.latestPrice * shares,
                shares: shares,
                difference: color
              }})
            }

            this.setState({
              stocks: arr,
              investment: investment
            })
          })
    }
  }

  stockRow = () => {
    let stocks = this.state.stocks.map((stock, id) => {
      for(let k in stock) {
        console.log(stock[k])
        return(
          <div className="stock_row" key={id}>
            <h3 style={{ color: `${stock[k].difference}`}}> {stock[k].ticker} </h3>
            <h3> {stock[k].shares} - Shares </h3>
            <h3 style={{ color: `${stock[k].difference}` }}> ${stock[k].price} </h3>
          </div>
        )
      }
    })

    return stocks
  }

  render() {
    console.log(this.state)

    return(
      <div>
        <h1>Balance - ${Math.round(this.state.investment * 100) / 100} </h1>

        <div className="stock_row_container">
          {this.stockRow()}
        </div>
      </div>
    )
  }
}

export default StocksList;
