import React, {Component} from 'react';
import RealEstateCard from "../RealEstateCard/RealEstateCard";
import "./RealEstateList.css"
import {REAL_ESTATE_PAGE_DATA} from "../../utils/DataProvider";
import MultiMarkerMap from "./../MultiMarkerMap/MultiMarkerMap";
import "../Styles/Title.css"

class RealEstateList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      realEstate: [],
      isListOfCards: true
    };

    this.toggleView = this.toggleView.bind(this);
  }

  componentDidMount() {
    this.setState({realEstate: this.fetchRealEstateData()});
  }

  fetchRealEstateData() {
    return REAL_ESTATE_PAGE_DATA;
  }

  extractMarkerData() {
    return this.state.realEstate.map(data => ({
      id: data.id,
      title: data.name,
      name: data.name,
      position: data.position
    }))
  }

  toggleView() {
    this.setState(curState => ({isListOfCards: !curState.isListOfCards}))
  }

  render() {

    let realEstateCards;
    if (this.state.isListOfCards) {
      realEstateCards = this.state.realEstate.map(data =>
          <RealEstateCard key={data.id} {...data} elementClass="RealEstateList__RealEstateCard"/>);
    }

    // noinspection CheckTagEmptyBody
    return (
        <div className="RealEstateList">
          <h2 className="title">"Available Real Estate"</h2>
          <div className="right-positioning-wrapper">
            <button
                className="button button--success RealEstateList__change-layout-button"
                onClick={this.toggleView}
            >
              {this.state.isListOfCards ?
                  <><i className="fas fa-map-marked-alt"></i> Show On a Map</> :
                  <><i className="fas fa-th"></i> Show As a List</>}
            </button>
          </div>
          {this.state.isListOfCards ?
              <ul className="cards-list">
                {realEstateCards}
              </ul> :
              <MultiMarkerMap markerData={this.extractMarkerData()}/>}
        </div>
    );
  }
}

export default RealEstateList;