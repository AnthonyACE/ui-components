'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _find = require('lodash/collection/find');

var _find2 = _interopRequireDefault(_find);

var _findIndex = require('lodash/array/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _get = require('lodash/object/get');

var _get2 = _interopRequireDefault(_get);

var _cloneDeep = require('lodash/lang/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DataTable = require('ui-components/lib/DataTable');

var _DataTable2 = _interopRequireDefault(_DataTable);

var _SearchBox = require('../SearchBox');

var _SearchBox2 = _interopRequireDefault(_SearchBox);

var _Helpers = require('../utils/Helpers');

var _Helpers2 = _interopRequireDefault(_Helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint eqeqeq: "off" */


var AllList = function (_Component) {
  _inherits(AllList, _Component);

  function AllList(props) {
    _classCallCheck(this, AllList);

    var _this = _possibleConstructorReturn(this, (AllList.__proto__ || Object.getPrototypeOf(AllList)).call(this, props));

    _this.getOut = function (e) {
      e.preventDefault();
      _this.props.dataTableProps.onQueryChange({ parent_id: null, offset: 0, keyword: null });
    };

    _this.handleSelect = function (item) {
      // if it's inherited, do nothing.
      if ((0, _find2.default)(_this.props.inheritedItems, function (c) {
        return c.id == item.id;
      })) {
        return false;
      }
      var selectedItems = (0, _cloneDeep2.default)(_this.props.selectedItems);
      if (item.parent_id) {
        var parentItem = (0, _find2.default)(selectedItems, function (i) {
          return i.id == item.parent_id;
        });
        if (parentItem) {
          var subIndex = (0, _findIndex2.default)(parentItem.children, function (i) {
            return i.id == item.id;
          });
          if (subIndex !== -1) {
            parentItem.children.splice(subIndex, 1);
          } else {
            parentItem.children.push({ id: item.id, name: item.name });
          }
        } else {
          var _parentItem = (0, _find2.default)(_this.props.allItems, function (i) {
            return i.id == item.parent_id;
          });
          selectedItems.push({
            id: _parentItem.id,
            name: _parentItem.name,
            children: [{ id: item.id, name: item.name }]
          });
        }
      } else {
        var parentIndex = (0, _findIndex2.default)(selectedItems, function (i) {
          return i.id == item.id;
        });
        if (parentIndex !== -1) {
          selectedItems.splice(parentIndex, 1);
        } else {
          var _item = (0, _cloneDeep2.default)(item);
          _item.children = [];
          selectedItems.push(_item);
        }
      }
      _this.props.onChange(selectedItems);
    };

    _this.selectorColumn = {
      name: 'flag',
      title: _react2.default.createElement('i', { className: 'fa fa-check-circle fa-lg text-success' }),
      width: 30,
      sortable: false,
      style: { textAlign: 'center' },
      render: function render(value, data) {
        var checked = (0, _find2.default)(_this.props.selectedItems, function (c) {
          return c.id == data.id || (0, _find2.default)(c.children, function (i) {
            return i.id == data.id;
          });
        });
        return _react2.default.createElement('i', { onClick: _this.handleSelect.bind(_this, data), className: (0, _classnames2.default)('fa', 'fa-check-circle', 'fa-lg', { 'text-success': checked }) });
      }
    };
    return _this;
  }

  _createClass(AllList, [{
    key: 'renderBreadcrumb',
    value: function renderBreadcrumb() {
      var parentId = this.props.dataTableProps.query.parent_id;
      if (!parentId) {
        return _react2.default.createElement(
          'ol',
          { className: 'breadcrumb' },
          _react2.default.createElement(
            'li',
            { className: 'active bc__home', title: 'home' },
            _react2.default.createElement('i', { className: 'fa fa-home' })
          )
        );
      }

      var parentName = (0, _get2.default)((0, _find2.default)(this.props.allItems, function (i) {
        return i.id == parentId;
      }), 'name');
      return _react2.default.createElement(
        'ol',
        { className: 'breadcrumb' },
        _react2.default.createElement(
          'li',
          { className: 'active bc__home', title: 'home' },
          _react2.default.createElement(
            'a',
            { onClick: this.getOut },
            _react2.default.createElement('i', { className: 'fa fa-home' })
          )
        ),
        _react2.default.createElement(
          'li',
          { className: 'active', title: parentName },
          parentName
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$dataTableProps = this.props.dataTableProps;
      var onQueryChange = _props$dataTableProps.onQueryChange;
      var columns = _props$dataTableProps.columns;
      var total = _props$dataTableProps.total;
      var query = _props$dataTableProps.query;

      var allColumns = this.props.selectable ? [this.selectorColumn].concat(columns) : columns;

      return _react2.default.createElement(
        'div',
        { className: 'panel panel-default pick-panel col-xs-6' },
        _react2.default.createElement(
          'div',
          { className: 'panel-heading' },
          _react2.default.createElement(
            'strong',
            null,
            this.props.title
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'panel-body' },
          _react2.default.createElement(_SearchBox2.default, { handleQueryChange: onQueryChange, placeholder: this.props.searchBoxPlaceholder })
        ),
        this.renderBreadcrumb(),
        _react2.default.createElement(
          'div',
          { className: 'items-to-pick' },
          _react2.default.createElement(_DataTable2.default, {
            dataSource: this.props.listingItems,
            columns: allColumns,
            sortInfo: _Helpers2.default.arrayifySort(query.order),
            pager: false,
            onPageChange: onQueryChange,
            selectable: false,
            resizableColumns: false,
            style: { height: 30 * 10 + 28 },
            wrapperClassName: 'table-bordered'
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'panel-footer text-right' },
          _react2.default.createElement(_DataTable.Pagination, {
            offset: query.offset,
            limit: query.limit,
            total: total,
            onPageChange: onQueryChange,
            pageSizes: false
          })
        )
      );
    }
  }]);

  return AllList;
}(_react.Component);

AllList.propTypes = {
  title: _react.PropTypes.string.isRequired,
  selectable: _react.PropTypes.bool,
  searchBoxPlaceholder: _react.PropTypes.string.isRequired,
  listingItems: _react.PropTypes.array.isRequired,
  selectedItems: _react.PropTypes.array.isRequired,
  allItems: _react.PropTypes.array.isRequired,
  inheritedItems: _react.PropTypes.array,
  onChange: _react.PropTypes.func.isRequired,
  dataTableProps: _react.PropTypes.shape({
    onQueryChange: _react.PropTypes.func.isRequired,
    columns: _react.PropTypes.array.isRequired,
    total: _react.PropTypes.total,
    query: _react.PropTypes.object.isRequired
  })
};

exports.default = AllList;
module.exports = exports['default'];