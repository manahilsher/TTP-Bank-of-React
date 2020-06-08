import React, { Component } from "react";
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";

class Debits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debitInfo: this.props.debitInfo,
      accountBalance: this.props.accountBalance,
      amount: 0,
      description: "",
      date: {},
      debitCards: false
    };
  }

  setTime = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    return dateTime;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newDebit = {
      amount: this.state.amount,
      description: this.state.description,
      date: this.setTime()
    };
    let a = this.state.debitInfo.slice();
    a.push(newDebit);
    this.setState({
      debitInfo: a,
      accountBalance: this.state.accountBalance - this.state.amount
    });
    this.props.addDebit(
      newDebit,
      this.state.accountBalance - this.state.amount
    );
  };

  renderDebits = () => {
    return this.props.renderDebits(this.state.debitInfo);
  };

  render() {
    return (
      <div className="App">
        <Link to="/">Home</Link>
        <h1 style={{ color: "red" }}>Debits</h1>
        <AccountBalance accountBalance={this.state.accountBalance} />
        <div className="ui segment">
          <form className="ui form">
            <div className="field">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                min={0}
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="field">
              <label>Description</label>
              <input
                type="text"
                name="description"
                onChange={this.handleChange}
              ></input>
            </div>
            <input
              type="submit"
              onClick={this.handleSubmit}
              value="Add Debit"
            ></input>
          </form>
        </div>
        <div className="row">{this.renderDebits()}</div>
      </div>
    );
  }
}

export default Debits;
