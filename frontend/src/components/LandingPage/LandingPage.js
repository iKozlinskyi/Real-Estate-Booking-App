import React, {Component} from 'react';
import {Link} from "react-router-dom";

class LandingPage extends Component {
  render() {
    return (
        <div>
          <Link to="/real-estate">
            Show real estate
          </Link>
        </div>
    );
  }
}

export default LandingPage;