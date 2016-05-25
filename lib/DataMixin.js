'use strict';

var _require = require('./utils');

var sort = _require.sort;
var filter = _require.filter;

var _ = require('lodash-compat');

var containsIgnoreCase = function containsIgnoreCase(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();
  return b.indexOf(a) >= 0;
};

function buildInitialState(props) {
  return {
    // Clone the initialData.
    data: props.initialData.slice(0),
    baseDataWithoutSort: props.initialData.slice(0),
    sortBy: props.initialSortBy,
    filterValues: {},
    currentPage: props.currentPage,
    pageLength: props.initialPageLength,
    totalCountResult: props.totalCountResult,
    isNeedLoadPerPage: props.isNeedLoadPerPage,
    isNeedSortOnPage: props.isNeedSortOnPage
  };
}

module.exports = {

  getInitialState: function getInitialState() {
    return buildInitialState(this.props);
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialPageLength: 10,
      pageLengthOptions: [5, 10, 20],
      isNeedLoadPerPage: true,
      isNeedSortOnPage: true,
      filters: {
        globalSearch: {
          filter: containsIgnoreCase
        }
      }
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState(buildInitialState(nextProps));
  },

  componentWillMount: function componentWillMount() {
    // Do the initial sorting if specified.
    var _state = this.state;
    var sortBy = _state.sortBy;
    var data = _state.data;
    var baseDataWithoutSort = _state.baseDataWithoutSort;

    if (sortBy) {
      this.setState({ data: sort(sortBy, _.cloneDeep(baseDataWithoutSort)) });
    }
  },

  onSort: function onSort(sortBy) {
    var copyBaseData = _.clone(this.state.baseDataWithoutSort);
    if (this.props.isNeedSortOnPage) {
      this.setState({
        sortBy: sortBy,
        data: sort(sortBy, copyBaseData)
      });
    }
    if (this.props.onSort) {
      this.props.onSort(sortBy, sort(sortBy, copyBaseData));
    }
  },

  onFilter: function onFilter(filterName, filterValue) {
    var _state2 = this.state;
    var filterValues = _state2.filterValues;
    var sortBy = _state2.sortBy;
    var _props = this.props;
    var initialData = _props.initialData;
    var filters = _props.filters;

    filterValues[filterName] = filterValue;
    var newData = filter(filters, filterValues, initialData);
    newData = sort(sortBy, newData);

    this.setState({
      data: newData,
      baseDataWithoutSort: newData,
      filterValues: filterValues,
      currentPage: 0
    });
  },

  // Pagination
  buildPage: function buildPage() {
    var _state3 = this.state;
    var data = _state3.data;
    var currentPage = _state3.currentPage;
    var pageLength = _state3.pageLength;
    var totalCountResult = _state3.totalCountResult;
    var isNeedLoadPerPage = _state3.isNeedLoadPerPage;

    var start = pageLength * currentPage;
    return {
      data: isNeedLoadPerPage ? data : data.slice(start, start + pageLength),
      baseDataWithoutSort: isNeedLoadPerPage ? data : data.slice(start, start + pageLength),
      //data: data.slice(start, start + pageLength),
      //data: data,
      currentPage: currentPage,
      totalPages: isNeedLoadPerPage ? Math.ceil(totalCountResult / pageLength) : Math.ceil(data.length / pageLength)
    };
  },

  //totalPages: Math.ceil(data.length / pageLength),
  //totalPages: Math.ceil(totalCountResult / pageLength),
  onChangePage: function onChangePage(pageNumber) {
    var _this = this;

    this.setState({ currentPage: pageNumber }, function () {
      if (_this.props.onChangePage) {
        _this.props.onChangePage(pageNumber);
      }
    });
  },

  onPageLengthChange: function onPageLengthChange(value) {
    var _this2 = this;

    var newPageLength = +value;
    var _state4 = this.state;
    var currentPage = _state4.currentPage;
    var pageLength = _state4.pageLength;

    var newPage = Math.floor(currentPage * pageLength / newPageLength);

    this.setState({
      pageLength: newPageLength,
      currentPage: newPage
    }, function () {
      if (_this2.props.onPageLengthChange) {
        _this2.props.onPageLengthChange(newPageLength);
      }
    });
  }

};