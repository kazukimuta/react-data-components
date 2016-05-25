"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var React = require('react');

var SearchField = (function () {
  function SearchField() {
    _classCallCheck(this, SearchField);

    this.onChange = this.onChange.bind(this);
  }

  _createClass(SearchField, [{
    key: "onChange",
    value: function onChange(e) {
      this.props.onChange(e.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "label",
          { htmlFor: this.props.id },
          this.props.label
        ),
        React.createElement("input", {
          id: this.props.id,
          type: "search",
          value: this.props.value,
          onChange: this.onChange,
          autoFocus: this.props.onFocus })
      );
    }
  }]);

  return SearchField;
})();

module.exports = SearchField;