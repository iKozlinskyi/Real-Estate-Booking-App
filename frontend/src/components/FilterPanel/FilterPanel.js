import React, {Component} from 'react';
import "./FilterPanel.css"
import {withElementClassName} from "../HOCs/withElementClassName";
import "../Styles/Button.css"

class FilterPanel extends Component {

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleChange(evt) {
    const {name, value} = evt.target;
    this.props.onFiltersChange(name, value);
  }

  handlePriceChange(evt) {
    const {name, value} = evt.target;
    this.props.onPriceFiltersChange(name, value);
  }

  handleSortChange(evt) {
    const {value} = evt.target;
    this.props.onSortChange(value);
  }

  handleResetClick(evt) {
    evt.preventDefault();
    this.props.handleResetClick();
  }

  render() {
    return (
        <form action="#"
              className={`FilterPanel ${this.props.elementClassName}`}
        >
          <h3 className="FilterPanel__title">Filters</h3>
          Real Estate Name
          <input
              type="text"
              name="realEstateName"
              className="filter-input-field FilterPanel__filter-input-field"
              placeholder="Cozy House"
              value={this.props.realEstateName}
              onChange={this.handleChange}
          />
          City:
          <select
              name="city"
              className="filter-input-field FilterPanel__filter-input-field"
              value={this.props.city}
              onChange={this.handleChange}
          >
            <option value="">All Cities</option>
            <option value="Kyiv">Kyiv</option>
            <option value="Lviv">Lviv</option>
            <option value="Odessa">Odessa</option>
          </select>
          Price:
          <div className="price-group">
            <div className="price-group__price-from">
              <div className="price-group__text">From:</div>
              <input
                  type="number"
                  min={1}
                  name="from"
                  className="filter-input-field price-group__filter-input-field"
                  placeholder={10}
                  value={this.props.priceFrom}
                  onChange={this.handlePriceChange}
              />
            </div>

            <div className="price-group__price-to">
              <div className="price-group__text">To:</div>
              <input
                  type="number"
                  min={2}
                  name="to"
                  className="filter-input-field price-group__filter-input-field"
                  placeholder={100}
                  value={this.props.priceTo}
                  onChange={this.handlePriceChange}
              />
            </div>
          </div>
          <div className="FilterPanel__sort-block">
            Sort By:
            <select
                name="sortBy"
                className="filter-input-field FilterPanel__filter-input-field"
                value={this.props.sortBy}
                onChange={this.handleSortChange}
            >
              <option value="0">Name - A to Z</option>
              <option value="1">Name - Z to A</option>
              <option value="2">Price (cheap first)</option>
              <option value="3">Price (expensive first)</option>
            </select>
          </div>
          <button
              className="button button--link FilterPanel__reset-button"
              onClick={this.handleResetClick}
          >
            Reset
          </button>

        </form>
    );
  }
}

export default withElementClassName(FilterPanel);