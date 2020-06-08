import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import Debits from "./components/Debits";
import Login from "./components/Login";

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
      creditInfo: null
    };
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
      accountBalance: accountBalance
    });
  };

  setCreditInfo = (creditInfo) => {
    this.setState({ creditInfo });
  };

  setAccountBalance = (newBalance) => {
    this.setState({ accountBalance: newBalance });
  };

  render() {
    const HomeComponent = () => (
      <Home
        accountBalance={this.state.accountBalance}
        debitInfo={this.state.debitInfo}
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
      />
    );

    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LoginComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
