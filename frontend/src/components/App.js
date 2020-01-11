import React, { Component } from 'react';
import Main from "./Main";
import "./App.css"
import NavBar from "./NavBar";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navBarCollapsed: true
    };

    this.toggleNavBar = this.toggleNavBar.bind(this);
  }

  toggleNavBar() {
    this.setState(curState => ({navBarCollapsed: !curState.navBarCollapsed}));
  }

  render() {
    return (
      <div className="App">
        <NavBar isCollapsed={this.state.navBarCollapsed} toggleNavBar={this.toggleNavBar} isLoggedIn/>
        <Main />
      </div>
    );
  }
}

export default App;
