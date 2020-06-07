import React, { Component } from "react";
import axios from "axios";

class AccountBalance extends Component {
  constructor(props) {
    super(props);
    this.state = { debits: 0, credits: 0, debitInfo: [], creditInfo: [] };
  }

  async componentDidMount() {
    let totalDebit = 0;
    let totalCredit = 0;
    const debitRes = await axios.get("https://moj-api.herokuapp.com/debits");
    debitRes.data.forEach((debit) => {
      totalDebit += debit.amount;
    });
    console.log(totalDebit);
    const creditRes = await axios.get("https://moj-api.herokuapp.com/credits");
    creditRes.data.forEach((credit) => {
      totalCredit += credit.amount;
    });
    console.log(totalCredit);
    this.setState({
      debits: totalDebit,
      credits: totalCredit,
      debitInfo: debitRes.data,
      creditInfo: creditRes.data
    });
    this.props.setAccountBalance(this.state.credits, this.state.debits);
    this.props.setDebits(this.state.debitInfo);
    this.props.setCredits(this.state.creditInfo);
  }

  render() {
    return (
      <>
        <div>
          Balance: ${(this.state.credits - this.state.debits).toFixed(2)}
        </div>
      </>
    );
  }
}

export default AccountBalance;
