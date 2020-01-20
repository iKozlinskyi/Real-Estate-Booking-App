class FilterService {

  // static filterFunctions = {
  //   "name": (substr) =>
  // };

  constructor() {
    this.appliedFilters = [];
  }

  addFilter(predicateFunc) {
    this.appliedFilters.push(predicateFunc);
  }


  filter(arr) {
    let filteredArr = [...arr];
    for (let predicateFunc of this.appliedFilters) {
      filteredArr = filteredArr.filter(predicateFunc);
    }

    return filteredArr;
  }
}

export default FilterService;