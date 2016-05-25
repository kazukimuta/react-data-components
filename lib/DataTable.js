'use strict';

var React = require('react');
var Table = require('./Table');
var Pagination = require('./Pagination');
var SelectField = require('./SelectField');
var SearchField = require('./SearchField');

var DataMixin = require('./DataMixin');

var DataTable = React.createClass({
  displayName: 'DataTable',

  mixins: [DataMixin],

  render: function render() {
    var page = this.buildPage();
    var searchField = '';
    if (this.props.isRequireSearch) {
      searchField = React.createElement(SearchField, {
        id: 'search-field',
        onFocus: this.props.onFocus ? true : false,
        label: this.props.searchLabel ? this.props.searchLabel : 'Search:',
        value: this.state.filterValues.globalSearch,
        onChange: this.onFilter.bind(this, 'globalSearch') });
    }
    return React.createElement(
      'div',
      { className: this.props.className },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col-xs-4' },
          React.createElement(SelectField, {
            id: 'page-menu',
            label: this.props.pageSizeLabel ? this.props.pageSizeLabel : 'Page size:',
            value: this.state.pageLength,
            options: this.props.pageLengthOptions,
            onChange: this.onPageLengthChange
          }),
          searchField
        ),
        React.createElement(
          'div',
          { className: 'col-xs-8' },
          React.createElement(Pagination, {
            className: 'pagination pull-right',
            currentPage: page.currentPage,
            totalPages: page.totalPages,
            onChangePage: this.onChangePage
          })
        )
      ),
      React.createElement(Table, {
        className: 'table table-bordered',
        dataArray: page.data,
        columns: this.props.columns,
        keys: this.props.keys,
        buildRowOptions: this.props.buildRowOptions,
        noDataLabel: this.props.noDataLabel,
        sortBy: this.state.sortBy,
        onSort: this.onSort,
        isNeedSortOnPage: this.props.isNeedSortOnPage
      })
    );
  }
});

module.exports = DataTable;