import React, {Component} from 'react';
import RealEstateCard from "../RealEstateCard/RealEstateCard";
import "./RealEstateList.css"
import {REAL_ESTATE_PAGE_DATA} from "../../utils/DataProvider";
import MultiMarkerMap from "./../MultiMarkerMap/MultiMarkerMap";
import "../Styles/Title.css"
import FilterPanel from "../FilterPanel/FilterPanel";
import "../Styles/Button.css"


class RealEstateList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      realEstate: [],
      isListOfCards: true,
      isFilterPanelCollapsed: true,
      filters: {
        realEstateName: "",
        city: "",
        price: {
          from: "",
          to: ""
        }
      }
    };

    this.toggleView = this.toggleView.bind(this);
    this.onFiltersChange = this.onFiltersChange.bind(this);
    this.onPriceFiltersChange = this.onPriceFiltersChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.toggleFilterPanel = this.toggleFilterPanel.bind(this);
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

  onFiltersChange(propName, propValue) {
    this.setState(curState => ({
      ...curState,
      filters: {
        ...curState.filters,
        [propName]: propValue
      }
    }))
  }

  onPriceFiltersChange(propName, propValue) {
    const testRegEx = /^([1-9]\d*)?$/;

    if (!testRegEx.test(propValue)) return;

    this.setState(curState => ({
      ...curState,
      filters: {
        ...curState.filters,
        price: {
          ...curState.filters.price,
          [propName]: propValue
        }
      }
    }))
  }

  resetForm() {
    this.setState(curState => ({
      ...curState,
      filters: {
        realEstateName: "",
        city: "",
        price: {
          from: "",
          to: ""
        }
      }
    }))
  }

  toggleFilterPanel() {
    this.setState(curState => ({
      isFilterPanelCollapsed: !curState.isFilterPanelCollapsed
    }))
  }

  render() {

    let realEstateCards;
    if (this.state.isListOfCards) {
      realEstateCards = this.state.realEstate.map(data =>
          <RealEstateCard key={data.id} {...data} elementClass="RealEstateList__RealEstateCard"/>);
    }

    const toggleButtonWord = this.state.isFilterPanelCollapsed ? "Show" : "Hide";

    // noinspection CheckTagEmptyBody
    return (
        <div className="RealEstateList">
          <h2 className="title">Available Real Estate</h2>
          <div className="button-wrapper">
            <button
                className="toggle-filterList-button RealEstateList__toggle-filterList-button"
                onClick={this.toggleFilterPanel}
            >

              {`${toggleButtonWord} Filters`}
            </button>
          </div>
          <div className="flex-wrapper">
            <FilterPanel
                elementClassName={`RealEstateList__FilterPanel
                 ${ this.state.isFilterPanelCollapsed && 
                "RealEstateList__FilterPanel--collapsed"}`}

                onFiltersChange={this.onFiltersChange}
                onPriceFiltersChange={this.onPriceFiltersChange}
                realEstateName={this.state.filters.realEstateName}
                city={this.state.filters.city}
                priceFrom={this.state.filters.price.from}
                priceTo={this.state.filters.price.to}
                handleResetClick={this.resetForm}
            />
            <div className="RealEstateList__result-block">
              <div className="centering-wrapper">
                <div>
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
                      <div className="map-wrapper">
                        <MultiMarkerMap markerData={this.extractMarkerData()}/>
                      </div>
                      }
                </div>
              </div>
            </div>
            </div>
        </div>
    );
  }
}

export default RealEstateList;