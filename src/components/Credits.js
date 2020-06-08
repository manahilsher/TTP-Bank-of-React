import React, { Component } from "react";
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";

class Credits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditInfo: this.props.creditInfo,
      accountBalance: this.props.accountBalance,
      amount: 0,
      description: "",
      date: {}
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

  handleDescChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleAmountChange = (e) => {
    this.setState({ amount: Number(e.target.value) });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newCredit = {
      amount: this.state.amount,
      description: this.state.description,
      date: this.setTime()
    };
    let a = this.state.creditInfo.slice();
    a.push(newCredit);
    this.setState({
      creditInfo: a,
      accountBalance: this.state.accountBalance + this.state.amount
    });
    this.props.addCredit(
      newCredit,
      this.state.accountBalance + this.state.amount
    );
  };

  renderCredits = () => {
    return this.props.renderCredits(this.state.creditInfo);
  };

  render() {
    return (
      <div className="App">
        <Link to="/">Home</Link>
        <h1 style={{ color: "red" }}>Credits</h1>
        <AccountBalance accountBalance={this.state.accountBalance} />
        <div className="ui segment">
          <form className="ui form">
            <div className="field">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                min={0}
                onChange={this.handleAmountChange}
              ></input>
            </div>
            <div className="field">
              <label>Description</label>
              <input
                type="text"
                name="description"
                onChange={this.handleDescChange}
              ></input>
            </div>
            <input
              type="submit"
              onClick={this.handleSubmit}
              value="Add Credit"
            ></input>
          </form>
        </div>
        <div className="row">{this.renderCredits()}</div>
      </div>
    );
  }
}

export default Credits;
