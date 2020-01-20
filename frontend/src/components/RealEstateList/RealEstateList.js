import React, {Component} from 'react';
import RealEstateCard from "../RealEstateCard/RealEstateCard";
import {withElementClassName} from "../HOCs/withElementClassName";
import "./RealEstateList.css"
import {withPagination} from "../HOCs/withPagination";

class RealEstateList extends Component {
  render() {
    const {
      data,
      elementClassName,
      pageCount,
      currentPageNumber,
      previousPage,
      nextPage
    } = this.props;

    const realEstateCards = data.map(item =>
        <RealEstateCard key={item.id} {...item} elementClassName="RealEstateList__RealEstateCard"/>);
    return (
        <>
          <ul className={`RealEstateList ${elementClassName}`}>
            {realEstateCards}
          </ul>
          <div className="paging-control-block RealEstateList__paging-control-block">
            <button
                className="paging-button"
                onClick={previousPage}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="page-status paging-control-block__page-status">
              Page {currentPageNumber + 1} of {pageCount}
            </div>
            <button
                className="paging-button"
                onClick={nextPage}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </>
    );
  }
}

export default withPagination(
    withElementClassName(RealEstateList)
);