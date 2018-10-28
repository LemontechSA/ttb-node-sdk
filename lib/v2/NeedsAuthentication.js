"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _Constants = _interopRequireDefault(require("./Constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NeedsAuthentication =
/*#__PURE__*/
function () {
  function NeedsAuthentication(subdomain, authToken) {
    _classCallCheck(this, NeedsAuthentication);

    this.authToken = authToken;
    this.subdomain = subdomain;
  }

  _createClass(NeedsAuthentication, [{
    key: "apiClient",
    value: function apiClient() {
      return _axios.default.create({
        baseURL: "".concat(_Constants.default.baseUrl(this.subdomain)),
        headers: {
          common: {
            AUTHTOKEN: this.authToken
          }
        }
      });
    }
  }]);

  return NeedsAuthentication;
}();

exports.default = NeedsAuthentication;