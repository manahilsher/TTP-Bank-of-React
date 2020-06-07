import React, { Component } from "react";

class Debits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debitInfo: this.props.debitInfo,
      accountBalance: this.props.accountBalance
    };
  }

  setRender = () => {
    const allDebits = this.state.debitInfo.map((debit) => {
      return (
        <div>
          <h2>{debit.amount}</h2>
          <h4>{debit.description}</h4>
          <h4>{debit.date}</h4>
        </div>
      );
    });
    return allDebits;
  };

  render() {
    return (
      <div className="App">
        <h1>Debits</h1>
        {this.state.accountBalance}
        <h4>Debits: </h4>
        {this.setRender()}
      </div>
    );
  }
}

export default Debits;
