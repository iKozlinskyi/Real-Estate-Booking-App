const sortService = {
  sortFunctions : {
    "name": (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
    "nameReversed": (a, b) => b.name.toLowerCase() > a.name.toLowerCase() ? 1 : -1,
    "priceCheapFirst": (a, b) => a.price - b.price,
    "priceExpensiveFirst": (a, b) => b.price - a.price,
  },

  mapIndexToSortFunctionName : {
    0: "name",
    1: "nameReversed",
    2: "priceCheapFirst",
    3: "priceExpensiveFirst"
  },

  getFunctionByIndex(functionIndex) {
    const sortFunctionName = this.mapIndexToSortFunctionName[functionIndex];
    return this.sortFunctions[sortFunctionName];
  },

  sortData(sortFunctionIndex, data) {
    const sortFunction = this.getFunctionByIndex(sortFunctionIndex);
    return data.sort(sortFunction);
  }
};

export {sortService}