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
import CreateOrUpdateEstateForm from "./CreateOrUpdateEstateForm";

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
                <Route exact path="/real-estate" >
                  <RealEstateList />
                </Route>
                <Route exact path="/register" >
                  <div className="form-wrapper">
                    <SignUpForm elementClassName="Main__login-form"/>
                  </div>
                </Route>
                <Route exact path="/login" >
                  <div className="form-wrapper">
                    <LogInForm elementClassName="Main__login-form"/>
                  </div>
                </Route>
                <Route exact path="/real-estate/new" >
                  <div className="form-wrapper">
                    <CreateOrUpdateEstateForm elementClassName="Main__Form"/>
                  </div>
                </Route>
                <Route exact path="/real-estate/:id/edit" >
                  <div className="form-wrapper">
                    <CreateOrUpdateEstateForm elementClassName="Main__Form" isUpdateForm={true}/>
                  </div>
                </Route>
                <Route exact path="/real-estate/:id"
                       children={(routerProps) => <RealEstatePage {...routerProps}/>}
                />
              </Switch>
            </Main>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
