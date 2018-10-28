"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Session = _interopRequireDefault(require("./Session"));

var _Clients = _interopRequireDefault(require("./Clients"));

var _Projects = _interopRequireDefault(require("./Projects"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var V2 =
/*#__PURE__*/
function () {
  function V2(subdomain) {
    _classCallCheck(this, V2);

    this.subdomain = subdomain;
    this.authToken = null;
  }

  _createClass(V2, [{
    key: "login",
    value: function login(user, password, appKey) {
      var _this = this;

      return _Session.default.login(this.subdomain, {
        user: user,
        password: password,
        app_key: appKey
      }).then(function (data) {
        _this.authToken = data.auth_token;
        return data;
      });
    }
  }, {
    key: "clients",
    value: function clients() {
      if (_lodash.default.isEmpty(this.authToken)) {
        throw new Error('Undefined authToken. Please login');
      }

      return new _Clients.default(this.subdomain, this.authToken);
    }
  }, {
    key: "projects",
    value: function projects() {
      if (_lodash.default.isEmpty(this.authToken)) {
        throw new Error('Undefined authToken. Please login');
      }

      return new _Projects.default(this.subdomain, this.authToken);
    }
  }]);

  return V2;
}();

exports.default = V2;