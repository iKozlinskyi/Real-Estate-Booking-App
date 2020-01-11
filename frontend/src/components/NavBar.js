import React, {Component} from 'react';
import "./NavBar.css"

class NavBar extends Component {

  constructor(props) {
    super(props) ;

    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    this.props.toggleNavBar();
  }

  render() {
    return (
        <nav className="NavBar">
          <div className="NavBar__item always-visible">
            <div className="NavBar__logo">
              <a href="#" className="NavBar__link"><i className="fas fa-home"></i> HouseFinder</a>
            </div>
            <button id="toggleBtn" className="NavBar__button" onClick={this.handleClick}>☰</button>
          </div>

          <ul id="collapsible" className={this.props.isCollapsed && "NavBar__collapsible--hidden"}>
            <li className="NavBar__item collapsible__item NavBar__item--first">Logged in as
              "USERNAME"</li>
            <li className="NavBar__item collapsible__item NavBar__item--third"><a href="#"
                                                                                  className="NavBar__link">Log Out</a>
            </li>
            <li className="NavBar__item collapsible__item NavBar__item--third"><a href="#"
                                                                                  className="NavBar__link">Log In</a>
            </li>
            <li className="NavBar__item collapsible__item NavBar__item--third"><a href="#" className="NavBar__link">Sign Up</a>
            </li>
            <li className="NavBar__item collapsible__item NavBar__item--second"><a href="#"
                                                                                   className="NavBar__link">Add Real Estate</a>
            </li>
          </ul>
        </nav>
    );
  }
}

export default NavBar;