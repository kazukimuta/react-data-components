'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var React = require('react');

var SelectField = (function () {
  function SelectField() {
    _classCallCheck(this, SelectField);

    this.onChange = this.onChange.bind(this);
  }

  _createClass(SelectField, [{
    key: 'onChange',
    value: function onChange(e) {
      this.props.onChange(e.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var id = _props.id;
      var options = _props.options;
      var label = _props.label;
      var value = _props.value;

      var mappedOpts = options.map(function (each) {
        return React.createElement(
          'option',
          { key: each, value: each },
          each
        );
      });

      return React.createElement(
        'div',
        null,
        React.createElement(
          'label',
          { htmlFor: id },
          label
        ),
        React.createElement(
          'select',
          { id: id, value: value, onChange: this.onChange },
          mappedOpts
        )
      );
    }
  }]);

  return SelectField;
})();

module.exports = SelectField;