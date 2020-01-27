import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./NavBar.css"
import {withRouter} from "react-router-dom"

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClick() {
    this.props.toggleNavBar();
  }

  handleLogout() {
    this.props.handleLogout();

    this.props.history.replace({
      pathname: "/real-estate",
      state: {
        message: "You are logged out. Come back when you feel like it!"
      }
    });
  }

  render() {

    let {currentUsername} = this.props;

    const isLoggedIn = !!currentUsername;

    // noinspection CheckTagEmptyBody
    return (
        <nav className="NavBar">
          <div className="NavBar__item NavBar__item--always-visible">
            <div className="NavBar__logo">
              <Link to="/" className="NavBar__link"><i className="fas fa-home"></i> HouseFinder</Link>
            </div>
            {isLoggedIn &&
            <div className="">
              <Link to="#" className="NavBar__link">Logged in as {currentUsername}</Link>
            </div>}
            <button id="toggleBtn" className="NavBar__button" onClick={this.handleClick}>☰</button>
          </div>

          <ul className={`NavBar__collapsible-block ${this.props.isCollapsed && "NavBar__collapsible-block--hidden"}`}>

            {isLoggedIn ?
                <>
                  <li className="NavBar__item NavBar__item--collapsible NavBar__item--third">
                    <div
                        className="NavBar__link"
                        onClick={this.handleLogout}
                    >Log Out
                    </div>
                  </li>
                </> :
                <>
                  <li className="NavBar__item NavBar__item--collapsible NavBar__item--third">
                    <Link to="/login" className="NavBar__link">Log In</Link>
                  </li>
                  <li className="NavBar__item NavBar__item--collapsible NavBar__item--third">
                    <Link to="/register" className="NavBar__link">Sign Up</Link>
                  </li>
                </>
            }
            <li className="NavBar__item NavBar__item--collapsible NavBar__item--second">
              <Link to="/real-estate/new" className="NavBar__link">Add Real Estate</Link>
            </li>
          </ul>
        </nav>
    );
  }
}

export default withRouter(NavBar);