import React, { Component } from "react";
import { connect } from "react-redux";
import {Form, Button} from 'react-bootstrap';
import { newBalanceFetch } from "../Redux/actions";


class Purchase extends Component {
  state = {
    ticker: "",
    quantity: 0,
    price: 0
  }

  user_input = event => {
    let data = event.target.value
    if(event.target.name === "quantity") {
      data = parseInt(event.target.value)
    }
    this.setState({
      [event.target.name]: data
    })
  }

  purchasable = (price, quantity, stock_id) => {
    let cost = price * quantity
    let purchased = false;
    if(cost < this.props.user.balance) {
      purchased = true
      console.log("purchaseable")
      fetch('http://localhost:3000/api/v1/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          transaction: {
            user_id: this.props.user.id,
            stock_id: stock_id,
            num_share: this.state.quantity,
            price: price
          }
        })
      })
        .then(res => res.json())
        .catch(err => console.log(err))
    } else {
      alert("funds low")
    }

    if(purchased) {
      console.log("this is now being purchased")
      let newBalance = this.props.user.balance - cost
      newBalance = Math.round(newBalance * 100) / 100;
      this.props.newBalanceFetch(this.props.user.id, newBalance)
    }
  }

  createStockFetch = stockObj => {
    console.log("post fetch", stockObj)
    fetch('http://localhost:3000/api/v1/stocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        stock: {
          name: stockObj.companyName,
          ticker: stockObj.symbol,
          open_price: stockObj.open
        }
      })
    })
      .then(res => res.json())
      .then(stock => {
        this.setState({
          stock_id: stock.id
        })
        this.stockFetch(stockObj.latestPrice, this.state.quantity)
      })
  }

  stockFetch = (price, quantity) => {
    fetch('http://localhost:3000/api/v1/stocks')
      .then(res => res.json())
      .then(stocks => {
        let foundStock = stocks.filter(stock => stock.ticker.toLowerCase() === this.state.ticker.toLowerCase());
        this.purchasable(price, quantity, foundStock[0].id)
      })
      .catch(err => console.log(err))
  }


  purchase = event => {
    event.preventDefault()
    let symbols = this.state.ticker

    fetch(`https://sandbox.iexapis.com/stable/stock/${symbols}/quote?token=Tpk_f0480a3b576c4f7e9da28303a3d72ff6`, {
      method: "GET",
      headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      }
    })
      .then(res => res.json())
      .then(stock => {
        // console.log(`Symbol: ${stock.symbol}, Company: ${stock.companyName}, Open: ${stock.open}, Current Price: ${stock.latestPrice}`)
        this.createStockFetch(stock)
      })
  }

  render() {
    return(
      <div>
        <h1 className="balance">{`Cash - $${this.props.user.balance}`}</h1>

        <div className="buying_form">
          <div className="form-group">
            <Form.Control type="string" name="ticker" placeholder="Ticker" onChange={this.user_input} value={this.state.ticker}/>
            <Form.Control type="number" name="quantity" placeholder="Qty" onChange={this.user_input} value={this.state.quantity}/>
          </div>

          <Button variant="primary" type="submit" onClick={this.purchase}> Submit </Button>
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

const mapDispatchToProps = (dispatch) => { // mapDispatchToProps sends info, arg of dispatch
  return { // returns and object usually name of what you want to return as a key
    newBalanceFetch: (id, newBalance) => dispatch(newBalanceFetch(id, newBalance)), // dispatch the imported data ususally same as key before
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
