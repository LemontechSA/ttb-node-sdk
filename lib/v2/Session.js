"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Constants = _interopRequireDefault(require("./Constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Session =
/*#__PURE__*/
function () {
  function Session() {
    _classCallCheck(this, Session);
  }

  _createClass(Session, null, [{
    key: "login",
    value: function login(subdomain, params) {
      var requiredParams = ['user', 'password', 'app_key'];

      if (!this.validateParams(params, requiredParams)) {
        throw new Error(this.parameterException(params, requiredParams));
      }

      return _axios.default.post("".concat(_Constants.default.baseUrl(subdomain), "/login"), {
        user: params.user,
        password: params.password,
        app_key: params.app_key
      }).then(function (response) {
        return response.data;
      });
    }
  }, {
    key: "validateParams",
    value: function validateParams(params, requiredParams) {
      return _lodash.default.intersection(_lodash.default.keys(params), requiredParams).length === requiredParams.length;
    }
  }, {
    key: "parameterException",
    value: function parameterException(params, requiredParams) {
      return "Required parameters missing, required are ".concat(requiredParams, " but found only ").concat(_lodash.default.keys(params));
    }
  }]);

  return Session;
}();

exports.default = Session;