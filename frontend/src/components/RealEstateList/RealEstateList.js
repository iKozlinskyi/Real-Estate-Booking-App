import React, {Component} from 'react';
import RealEstateCard from "../RealEstateCard/RealEstateCard";
import {withElementClassName} from "../HOCs/withElementClassName";
import "./RealEstateList.css"

class RealEstateList extends Component {
  render() {
    const {data, elementClassName} = this.props;

    const realEstateCards = data.map(item =>
        <RealEstateCard key={item.id} {...item} elementClassName="RealEstateList__RealEstateCard"/>);
    return (
        <ul className={`RealEstateList ${elementClassName}`}>
          {realEstateCards}
        </ul>
    );
  }
}

export default withElementClassName(RealEstateList);