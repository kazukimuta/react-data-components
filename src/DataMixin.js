var { sort, filter } = require('./utils');
var _ = require('lodash-compat');

var containsIgnoreCase = function(a, b) {
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

  getInitialState() {
    return buildInitialState(this.props);
  },

  getDefaultProps() {
    return {
      initialPageLength: 10,
      pageLengthOptions: [ 5, 10, 20 ],
      isNeedLoadPerPage: true,
      isNeedSortOnPage: true,
      filters: {
        globalSearch: {
          filter: containsIgnoreCase,
        },
      },
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState(buildInitialState(nextProps));
  },

  componentWillMount() {
    // Do the initial sorting if specified.
    var {sortBy, data, baseDataWithoutSort} = this.state;
    if (sortBy) {
      this.setState({ data: sort(sortBy, _.cloneDeep(baseDataWithoutSort)) });
    }
  },

  onSort(sortBy) {
    var copyBaseData = _.clone(this.state.baseDataWithoutSort);
    if(this.props.isNeedSortOnPage){
        this.setState({
        sortBy: sortBy,
        data: sort(sortBy, copyBaseData),
      });
    }
    if(this.props.onSort){
      this.props.onSort(sortBy, sort(sortBy, copyBaseData));
    }
  },

  onFilter(filterName, filterValue) {
    var {filterValues, sortBy} = this.state;
    var {initialData, filters} = this.props;

    filterValues[filterName] = filterValue;
    var newData = filter(filters, filterValues, initialData);
    newData = sort(sortBy, newData);

    this.setState({
      data: newData,
      baseDataWithoutSort: newData,
      filterValues: filterValues,
      currentPage: 0,
    });
  },

  // Pagination
  buildPage() {
    var {data, currentPage, pageLength, totalCountResult, isNeedLoadPerPage} = this.state;
    var start = pageLength * currentPage;
    return {
      data: (isNeedLoadPerPage ? data : data.slice(start, start + pageLength)),
      baseDataWithoutSort: (isNeedLoadPerPage ? data : data.slice(start, start + pageLength)),
      //data: data.slice(start, start + pageLength),
      //data: data,
      currentPage: currentPage,
      totalPages: (isNeedLoadPerPage ? Math.ceil(totalCountResult / pageLength) : Math.ceil(data.length / pageLength)),
      //totalPages: Math.ceil(data.length / pageLength),
      //totalPages: Math.ceil(totalCountResult / pageLength),
    };
  },

  onChangePage(pageNumber) {
    this.setState({ currentPage: pageNumber }, ()=>{
      if(this.props.onChangePage){
        this.props.onChangePage(pageNumber);
       }
    });
  },

  onPageLengthChange(value) {
    var newPageLength = +value;
    var {currentPage, pageLength} = this.state;
    var newPage = Math.floor((currentPage * pageLength) / newPageLength);

    this.setState({
      pageLength: newPageLength,
      currentPage: newPage,
    }, ()=>{
       if(this.props.onPageLengthChange){
        this.props.onPageLengthChange(newPageLength);
       }
    });
  },

};
