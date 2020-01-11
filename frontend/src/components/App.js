import React, { Component } from 'react';
import Main from "./Main";
import "./App.css"
import NavBar from "./NavBar";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navBarCollapsed: false
    };

    this.toggleNavBar = this.toggleNavBar.bind(this);
  }

  toggleNavBar() {
    this.setState(!this.state.navBarCollapsed);
  }

  render() {
    return (
      <div className="App">
        <NavBar isCollapsed={this.state.navBarCollapsed} toogleNavBar={this.toggleNavBar}/>
        <Main />
      </div>
    );
  }
}

export default App;
