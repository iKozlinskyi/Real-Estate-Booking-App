import React, {Component} from 'react';

const withPagination = WrappedComponent => {
  return class extends Component {

    static defaultProps = {
      itemsPerPage: 9
    };

    constructor() {
      super();

      this.state = {
        currentPageNumber: 0,
        nextPageAvailable: true,
        previousPageAvailable: false
      };

      this.nextPage = this.nextPage.bind(this);
      this.previousPage = this.previousPage.bind(this);
    }

    getTotalPageCount() {
      const itemCount = this.props.data.length;
      return Math.ceil(itemCount / this.props.itemsPerPage)
    }

    nextPage() {
      if (this.state.currentPageNumber === this.getTotalPageCount() - 1) {
        this.setState({nextPageAvailable: false});
        return;
      }

      this.setState(curState => ({
        currentPageNumber: curState.currentPageNumber + 1
      }))
    }

    previousPage() {
      if (this.state.currentPageNumber === 0) {
        this.setState({previousPageAvailable: false});
        return;
      }

      this.setState(curState => ({
        currentPageNumber: curState.currentPageNumber - 1
      }))
    }

    getCurrentPageData() {
      const {data, itemsPerPage} = this.props;
      const minIndex = itemsPerPage * this.state.currentPageNumber;
      const maxIndex = minIndex + itemsPerPage;

      const currentPageData = data.slice(minIndex, maxIndex);

      return currentPageData;
    }

    render() {

      const {
        nextPageAvailable,
        previousPageAvailable,
        currentPageNumber
      } = this.state;

      return(
          <WrappedComponent
              {...this.props}
              data={this.getCurrentPageData()}
              pageCount={this.getTotalPageCount()}
              nextPage={this.nextPage}
              previousPage={this.previousPage}
              nextPageAvailable={nextPageAvailable}
              previousPageAvailable={previousPageAvailable}
              currentPageNumber={currentPageNumber}
          />
      )
    }
  }
};

export {withPagination};