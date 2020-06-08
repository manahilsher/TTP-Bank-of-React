import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import Debits from "./components/Debits";
import Credits from "./components/Credits";
import Login from "./components/Login";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: "bob_loblaw",
        memberSince: "08/23/99"
      },
      debitInfo: null,
      creditInfo: null,
      debits: 0,
      credits: 0
    };
  }

  async componentDidMount() {
    const [debitResp, creditResp] = await axios.all([
      axios.get("https://moj-api.herokuapp.com/debits"),
      axios.get("https://moj-api.herokuapp.com/credits")
    ]);
    let debits = 0;
    let credits = 0;
    debitResp.data.forEach((d) => (debits += d.amount));
    creditResp.data.forEach((c) => (credits += c.amount));
    this.setState({
      debits,
      credits,
      debitInfo: debitResp.data,
      creditInfo: creditResp.data,
      accountBalance: credits - debits
    });
  }
  mockLogin = (loginInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = loginInfo.userName;
    this.setState({ currentUser: newUser });
  };

  setDebitInfo = (debitInfo) => {
    this.setState({ debitInfo });
  };

  addDebit = (newDebit, accountBalance) => {
    let a = this.state.debitInfo.slice();
    a.push(newDebit);
    this.setState({
      debitInfo: a,
      accountBalance
    });
  };

  renderDebits = () => {
    const allDebits = this.state.debitInfo.map((debit) => {
      return (
        <div key={debit.date + debit.description} className="card">
          <div className="card-header">${debit.amount}</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{debit.description}</li>
            <li className="list-group-item">{debit.date}</li>
          </ul>
        </div>
      );
    });
    return allDebits;
  };

  setCreditInfo = (creditInfo) => {
    this.setState({ creditInfo });
  };

  addCredit = (newCredit, accountBalance) => {
    let a = this.state.creditInfo.slice();
    a.push(newCredit);
    this.setState({
      creditInfo: a,
      accountBalance
    });
  };

  renderCredits = () => {
    const allCredits = this.state.creditInfo.map((credit) => {
      return (
        <div key={credit.date + credit.description} className="card">
          <div className="card-header">${credit.amount}</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{credit.description}</li>
            <li className="list-group-item">{credit.date}</li>
          </ul>
        </div>
      );
    });
    return allCredits;
  };

  setAccountBalance = (newBalance) => {
    this.setState({ accountBalance: newBalance });
  };

  render() {
    const HomeComponent = () => (
      <Home
        accountBalance={this.state.accountBalance}
        debitInfo={this.state.debitInfo}
        creditInfo={this.state.creditInfo}
        setAccountBalance={this.setAccountBalance}
        setDebitInfo={this.setDebitInfo}
        setCreditInfo={this.setCreditInfo}
      />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
        accountBalance={this.state.accountBalance}
      />
    );
    const LoginComponent = () => (
      <Login
        user={this.state.currentUser}
        mockLogin={this.mockLogin}
        {...this.props}
      />
    );
    const DebitsComponent = () => (
      <Debits
        accountBalance={this.state.accountBalance}
        debitInfo={this.state.debitInfo}
        addDebit={this.addDebit}
        renderDebits={this.renderDebits}
      />
    );
    const CreditsComponent = () => (
      <Credits
        accountBalance={this.state.accountBalance}
        creditInfo={this.state.creditInfo}
        addCredit={this.addCredit}
        renderCredits={this.renderCredits}
      />
    );

    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LoginComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
