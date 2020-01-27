import React, {Component} from 'react';
import Main from "./Main/Main";
import NavBar from "./NavBar/NavBar";
import "./App.css"
import RealEstateListPage from "./RealEstateListPage/RealEstateListPage";
import {Route, Switch} from "react-router-dom";
import RealEstatePage from "./RealEstatePage/RealEstatePage";
import LandingPage from "./LandingPage/LandingPage";
import SignUpForm from "./SignUpForm/SignUpForm";
import LogInForm from "./LogInForm/LogInForm";
import CreateOrUpdateEstateForm from "./CreateOrUpdateEstateForm/CreateOrUpdateEstateForm";
import authService from "../Service/AuthService.js"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navBarCollapsed: true,
      currentUsername: ""
    };

    this.toggleNavBar = this.toggleNavBar.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    authService.refreshAuthHeader();
    this.handleLogin(authService.getUsername());
  }

  toggleNavBar() {
    this.setState(curState => ({navBarCollapsed: !curState.navBarCollapsed}));
  }

  handleLogin(username) {
    this.setState({
      currentUsername: username
    })
  }

  handleLogout()  {
    this.setState({
      currentUsername: null
    });

    authService.logOut();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" children={<LandingPage/>} />
          <Route>
            <NavBar
                isCollapsed={this.state.navBarCollapsed}
                toggleNavBar={this.toggleNavBar}
                currentUsername={this.state.currentUsername}
                handleLogout={this.handleLogout}
            />
            <Main>
              <Switch>
                <Route exact path="/real-estate" >
                  <RealEstateListPage currentUsername={this.state.currentUsername}/>
                </Route>
                <Route exact path="/register" >
                  <div className="form-wrapper">
                    <SignUpForm elementClassName="Main__SignUpForm"/>
                  </div>
                </Route>
                <Route exact path="/login" >
                  <div className="form-wrapper">
                    <LogInForm
                        elementClassName="Main__LogInForm"
                        onLogin={this.handleLogin}
                        onLogout={this.handleLogout}
                    />
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
                       children={(routerProps) => {
                         return (
                             <RealEstatePage
                                 {...routerProps}
                                 currentUsername={this.state.currentUsername}
                             />
                         )}}
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
