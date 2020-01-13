import React, { Component } from 'react';
import Main from "./Main";
import NavBar from "./NavBar";
import "./App.css"
import RealEstateList from "./RealEstateList";
import {Switch, Route} from "react-router-dom";
import RealEstatePage from "./RealEstatePage";
import LandingPage from "./LandingPage";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";

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
        <Switch>
          <Route exact path="/" children={<LandingPage/>} />
          <Route>
            <NavBar isCollapsed={this.state.navBarCollapsed} toggleNavBar={this.toggleNavBar} isLoggedIn={false}/>
            <Main>
              <Switch>
                <Route exact path="/real-estate/:id"
                       children={(routerProps) => <RealEstatePage {...routerProps}/>}
                />
                <Route exact path="/real-estate" >
                  <RealEstateList />
                </Route>
                <Route exact path="/register" >
                  <SignUpForm elementClass="Main__Form"/>
                </Route>
                <Route exact path="/login" >
                  <LogInForm elementClass="Main__Form"/>
                </Route>
              </Switch>
            </Main>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
