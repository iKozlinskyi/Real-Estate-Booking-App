import React, {Component} from 'react';
import RealEstateList from "./RealEstateList";
import "./Main.css"

class Main extends Component {
  render() {
    return (
        <div className="Main">
          <h2 className="Main__title">Available Real Estate</h2>
          <RealEstateList />
        </div>
    );
  }
}

export default Main;