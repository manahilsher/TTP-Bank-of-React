import React, { Component } from "react";
import AccountBalance from "./AccountBalance.js";
import { Link } from "react-router-dom";
import "../App.css";

class Home extends Component {
  render() {
    return (
      <div>
        <img
          src="https://m.economictimes.com/thumb/msid-71487585,width-1200,height-900,resizemode-4,imgsize-169788/bank-getty.jpg"
          alt="bank"
        />
        <h1>Bank of React</h1>

        <Link to="/userProfile">User Profile</Link>

        <AccountBalance
          accountBalance={this.props.accountBalance}
          debitInfo={this.props.debitInfo}
          setAccountBalance={this.props.setAccountBalance}
          setDebitInfo={this.props.setDebitInfo}
          setCreditInfo={this.props.setCreditInfo}
        />

        <Link to="/debits">Debits</Link>
      </div>
    );
  }
}

export default Home;
