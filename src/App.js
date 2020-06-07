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
      debits: [],
      credits: []
    };
  }

  mockLogin = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  setDebits = (debits) => {
    this.setState({ debits });
  };

  setCredits = (credits) => {
    this.setState({ credits });
  };

  setAccountBalance = (credits, debits) => {
    this.setState({ accountBalance: (credits - debits).toFixed(2) });
  };

  render() {
    const HomeComponent = () => (
      <Home
        accountBalance={this.state.accountBalance}
        setAccountBalance={this.setAccountBalance}
        setDebits={this.setDebits}
        setCredits={this.setCredits}
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
        debitInfo={this.state.debits}
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
