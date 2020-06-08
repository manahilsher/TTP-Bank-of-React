import React, { Component } from "react";
import axios from "axios";

class AccountBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debits: 0,
      credits: 0,
      debitInfo: this.props.debitInfo,
      creditInfo: [],
      accountBalance: this.props.accountBalance
    };
  }

  async componentDidMount() {
    let totalDebit = 0;
    let totalCredit = 0;
    if (this.props.debitInfo === null) {
      const debitRes = await axios.get("https://moj-api.herokuapp.com/debits");
      debitRes.data.forEach((debit) => {
        totalDebit += debit.amount;
      });
      const creditRes = await axios.get(
        "https://moj-api.herokuapp.com/credits"
      );
      creditRes.data.forEach((credit) => {
        totalCredit += credit.amount;
      });
      this.setState({
        debits: totalDebit,
        credits: totalCredit,
        debitInfo: debitRes.data,
        creditInfo: creditRes.data
      });
      this.setState({ accountBalance: this.state.credits - this.state.debits });
      this.props.setAccountBalance(this.state.accountBalance);
      this.props.setDebitInfo(this.state.debitInfo);
      this.props.setCreditInfo(this.state.creditInfo);
    }
  }

  render() {
    return (
      <>
        <div>
          <h5 style={{ color: "purple" }}>
            Balance: ${this.props.accountBalance.toFixed(2)}
          </h5>
        </div>
      </>
    );
  }
}

export default AccountBalance;
