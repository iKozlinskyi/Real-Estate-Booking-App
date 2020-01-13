import React, {Component} from 'react';
import RealEstateCard from "./RealEstateCard";
import "./RealEstateList.css"
import Title from "./Title";
import {REAL_ESTATE_PREVIEW_DATA} from "../utils/DataProvider";

class RealEstateList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      realEstate: []
    }
  }

  componentDidMount() {
    this.setState({realEstate: this.fetchRealEstateData()});
  }

  fetchRealEstateData() {
    return REAL_ESTATE_PREVIEW_DATA;
  }

  render() {

    const realEstateCards = this.state.realEstate.map(data =>
        <RealEstateCard key={data.id} {...data} elementClass="RealEstateList__RealEstateCard"/>);
    return (
        <>
          <Title text="Available Real Estate" />
          <ul className="RealEstateList">
            {realEstateCards}
          </ul>
        </>
    );
  }
}

export default RealEstateList;