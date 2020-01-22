import React, {Component} from 'react';
import "./RealEstateListPage.css"
import MultiMarkerMap from "./../MultiMarkerMap/MultiMarkerMap";
import "../Styles/Title.css"
import FilterPanel from "../FilterPanel/FilterPanel";
import "../Styles/Button.css"
import RealEstateList from "../RealEstateList/RealEstateList";
import axios from "axios";
import {BASE_API_URL} from "../../utils/constants";


class RealEstateListPage extends Component {
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
      },
      filteredData: [],
      isLoading: true,
      error: ""
    };

    this.toggleView = this.toggleView.bind(this);
    this.onFiltersChange = this.onFiltersChange.bind(this);
    this.onPriceFiltersChange = this.onPriceFiltersChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.toggleFilterPanel = this.toggleFilterPanel.bind(this);
  }

  componentDidMount() {
    this.fetchRealEstateData();
  }

  fetchRealEstateData() {
    axios
        .get(`${BASE_API_URL}/real-estate`)
        .then(response => {
          this.setState({
            realEstate: response.data,
            filteredData: response.data,
            isLoading: false
          })
        })
        .catch(err => {
          console.log(err);
          this.setState({
            error: err,
            isLoading: false
          })
        });
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
    }), () => this.handleFilterChange())
  }

  onPriceFiltersChange(propName, propValue) {
    const testRegEx = /^([1-9]\d*)?$/;
    const {from: currentFrom, to: currentTo} = this.state.filters.price;

    if (!testRegEx.test(propValue)) return;
    if ((propName === "from" && propValue >= currentTo) ||
        (propName === "to" && propValue <= currentFrom)) {
      // this.showFilterFormMessage(text);
    }


    this.setState(curState => ({
      ...curState,
      filters: {
        ...curState.filters,
        price: {
          ...curState.filters.price,
          [propName]: propValue
        }
      }
    }), () => this.handleFilterChange())
  }

  resetForm() {
    this.setState(curState => ({
      ...curState,
      filteredData: curState.realEstate,
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

  handleFilterChange() {
    const {
      realEstateName,
      city,
      price: {
            from: priceFrom,
            to: priceTo
          }
    } = this.state.filters;

    if (realEstateName === "" && city === "") {
      this.setState(curState => ({
        filteredData: curState.realEstate
      }))
    }

    let filteredResult = this.state.realEstate;

    if (realEstateName !== "") {
      filteredResult = filteredResult.filter(item => item.name.toLowerCase()
          .includes(realEstateName.toLocaleLowerCase()));
    }
    if (city !== "") {
      filteredResult = filteredResult.filter(item => item.city === city)
    }
    if (priceFrom !== "" && priceTo !== "") {
      filteredResult = filteredResult.filter(
          item => parseInt(item.price) >= priceFrom && item.price <= priceTo
      );
    }

    this.setState({
      filteredData: filteredResult
    })
  }

  render() {
    const toggleButtonWord = this.state.isFilterPanelCollapsed ? "Show" : "Hide";

    const resultData = this.state.isListOfCards ?
          <RealEstateList
              elementClassName="RealEstateListPage__RealEstateList"
              data={this.state.filteredData}
          /> :
          <div className="map-wrapper">
            <MultiMarkerMap markerData={this.extractMarkerData()}/>
          </div>;

    const requestResult = this.state.error ?
        "An error occurred while processing your request. Please, try again later" :
        resultData;


    // noinspection CheckTagEmptyBody
    return (
        <div className="RealEstateListPage">
          <h2 className="title">Available Real Estate</h2>
          <div className="button-wrapper">
            <button
                className="toggle-filterList-button RealEstateListPage__toggle-filterList-button"
                onClick={this.toggleFilterPanel}
            >

              {`${toggleButtonWord} Filters`}
            </button>
          </div>
          <div className="flex-wrapper">
            <FilterPanel
                elementClassName={`RealEstateListPage__FilterPanel
                 ${this.state.isFilterPanelCollapsed &&
                "RealEstateListPage__FilterPanel--collapsed"}`}

                onFiltersChange={this.onFiltersChange}
                onPriceFiltersChange={this.onPriceFiltersChange}
                realEstateName={this.state.filters.realEstateName}
                city={this.state.filters.city}
                priceFrom={this.state.filters.price.from}
                priceTo={this.state.filters.price.to}
                handleResetClick={this.resetForm}
            />
            <div className="RealEstateListPage__result-block">
              <div className="centering-wrapper">
                <div className="centering-wrapper__center">
                  <div className="right-positioning-wrapper">
                    <button
                        className="button button--success RealEstateListPage__change-layout-button"
                        onClick={this.toggleView}
                    >
                      {this.state.isListOfCards ?
                          <><i className="fas fa-map-marked-alt"></i> Show On a Map</> :
                          <><i className="fas fa-th"></i> Show As a List</>}
                    </button>
                  </div>
                  {this.state.isLoading ? "Loading..." : requestResult}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default RealEstateListPage;