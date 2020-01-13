import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./NavBar.css"

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    this.props.toggleNavBar();
  }

  render() {

    let {isLoggedIn} = this.props;

    // noinspection CheckTagEmptyBody
    return (
        <nav className="NavBar">
          <div className="NavBar__item NavBar__item--always-visible">
            <div className="NavBar__logo">
              <Link to="/" className="NavBar__link"><i className="fas fa-home"></i> HouseFinder</Link>
            </div>
            <div className="">
              <Link to="#" className="NavBar__link">Logged in as "USERNAME"</Link>
            </div>
            <button id="toggleBtn" className="NavBar__button" onClick={this.handleClick}>☰</button>
          </div>

          <ul className={`NavBar__collapsible-block ${this.props.isCollapsed && "NavBar__collapsible-block--hidden"}`}>

            {isLoggedIn ?
                <>
                  <li className="NavBar__item NavBar__item--collapsible NavBar__item--third">
                    <Link to="#" className="NavBar__link">Log Out</Link>
                  </li>
                </> :
                <>
                  <li className="NavBar__item NavBar__item--collapsible NavBar__item--third">
                    <Link to="#" className="NavBar__link">Log In</Link>
                  </li>
                  <li className="NavBar__item NavBar__item--collapsible NavBar__item--third">
                    <Link to="/register" className="NavBar__link">Sign Up</Link>
                  </li>
                </>
            }
            <li className="NavBar__item NavBar__item--collapsible NavBar__item--second">
              <a href="#" className="NavBar__link">Add Real Estate</a>
            </li>
          </ul>
        </nav>
    );
  }
}

export default NavBar;