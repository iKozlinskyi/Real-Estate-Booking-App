import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./LandingPage.css"
import "../Styles/Button.css"

class LandingPage extends Component {
  render() {
    // noinspection CheckTagEmptyBody
    return (
        <main className="landing">
          <div className="landing__header header">
            <h1 className="landing__title">Welcome to FindHome!</h1>
            <Link to="/real-estate" className="button landing__button button--link">Browse Real Estate</Link>
          </div>
          <ul className="landing-carousel landing__landing-carousel">
            <li className="landing-carousel__landing-slide landing-slide"></li>
            <li className="landing-carousel__landing-slide landing-slide"></li>
            <li className="landing-carousel__landing-slide landing-slide"></li>
            <li className="landing-carousel__landing-slide landing-slide"></li>
            <li className="landing-carousel__landing-slide landing-slide"></li>
          </ul>
        </main>
    );
  }
}

export default LandingPage;