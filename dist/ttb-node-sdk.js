'use strict'
function _interopDefault(e) {
  return e && 'object' == typeof e && 'default' in e ? e.default : e
}
var Axios = _interopDefault(require('axios')),
  _ = _interopDefault(require('lodash'))
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function _defineProperties(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n]
    ;(r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      'value' in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r)
  }
}
function _createClass(e, t, n) {
  return t && _defineProperties(e.prototype, t), n && _defineProperties(e, n), e
}
function _inherits(e, t) {
  if ('function' != typeof t && null !== t)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    t && _setPrototypeOf(e, t)
}
function _getPrototypeOf(e) {
  return (_getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e)
      })(e)
}
function _setPrototypeOf(e, t) {
  return (_setPrototypeOf =
    Object.setPrototypeOf ||
    function(e, t) {
      return (e.__proto__ = t), e
    })(e, t)
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  return e
}
function _possibleConstructorReturn(e, t) {
  return !t || ('object' != typeof t && 'function' != typeof t)
    ? _assertThisInitialized(e)
    : t
}
var Constants = {
    baseUrl: function(e) {
      return 'https://'.concat(e, '.thetimebilling.com/time_tracking/api/v2')
    },
  },
  Session = (function() {
    function e() {
      _classCallCheck(this, e)
    }
    return (
      _createClass(e, null, [
        {
          key: 'login',
          value: function(e, t) {
            var n = ['user', 'password', 'app_key']
            if (!this.validateParams(t, n))
              throw new Error(this.parameterException(t, n))
            return Axios.post(''.concat(Constants.baseUrl(e), '/login'), {
              user: t.user,
              password: t.password,
              app_key: t.app_key,
            }).then(function(e) {
              return e.data
            })
          },
        },
        {
          key: 'validateParams',
          value: function(e, t) {
            return _.intersection(_.keys(e), t).length === t.length
          },
        },
        {
          key: 'parameterException',
          value: function(e, t) {
            return 'Required parameters missing, required are '
              .concat(t, ' but found only ')
              .concat(_.keys(e))
          },
        },
      ]),
      e
    )
  })(),
  NeedsAuthentication = (function() {
    function n(e, t) {
      _classCallCheck(this, n), (this.authToken = t), (this.subdomain = e)
    }
    return (
      _createClass(n, [
        {
          key: 'apiClient',
          value: function() {
            return Axios.create({
              baseURL: ''.concat(Constants.baseUrl(this.subdomain)),
              headers: { common: { AUTHTOKEN: this.authToken } },
            })
          },
        },
      ]),
      n
    )
  })(),
  Clients = (function(e) {
    function t() {
      return (
        _classCallCheck(this, t),
        _possibleConstructorReturn(
          this,
          _getPrototypeOf(t).apply(this, arguments)
        )
      )
    }
    return (
      _inherits(t, NeedsAuthentication),
      _createClass(t, [
        {
          key: 'all',
          value: function() {
            var e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : {}
            return this.apiClient()
              .get('/clients', e)
              .then(function(e) {
                return e.data
              })
          },
        },
      ]),
      t
    )
  })(),
  Projects = (function(e) {
    function t() {
      return (
        _classCallCheck(this, t),
        _possibleConstructorReturn(
          this,
          _getPrototypeOf(t).apply(this, arguments)
        )
      )
    }
    return (
      _inherits(t, NeedsAuthentication),
      _createClass(t, [
        {
          key: 'all',
          value: function() {
            var e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : {}
            return this.apiClient()
              .get('/projects', e)
              .then(function(e) {
                return e.data
              })
          },
        },
      ]),
      t
    )
  })(),
  TimeEntries = (function(e) {
    function i(e, t, n) {
      var r
      return (
        _classCallCheck(this, i),
        ((r = _possibleConstructorReturn(
          this,
          _getPrototypeOf(i).call(this, e, t)
        )).userId = n),
        r
      )
    }
    return (
      _inherits(i, NeedsAuthentication),
      _createClass(i, [
        {
          key: 'baseEndpoint',
          value: function() {
            return 'users/'.concat(this.userId, '/time_entries')
          },
        },
        {
          key: 'all',
          value: function() {
            var e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : {}
            return this.apiClient()
              .get(this.baseEndpoint(), e)
              .then(function(e) {
                return e.data
              })
          },
        },
      ]),
      i
    )
  })(),
  V2 = (function() {
    function t(e) {
      _classCallCheck(this, t),
        (this.subdomain = e),
        (this.authToken = null),
        (this.userId = null)
    }
    return (
      _createClass(t, [
        {
          key: 'login',
          value: function(e, t, n) {
            var r = this
            return Session.login(this.subdomain, {
              user: e,
              password: t,
              app_key: n,
            }).then(function(e) {
              return (r.authToken = e.auth_token), (r.userId = e.user_id), e
            })
          },
        },
        {
          key: 'clients',
          value: function() {
            if (_.isEmpty(this.authToken))
              throw new Error('Undefined authToken. Please login')
            return new Clients(this.subdomain, this.authToken)
          },
        },
        {
          key: 'projects',
          value: function() {
            if (_.isEmpty(this.authToken))
              throw new Error('Undefined authToken. Please login')
            return new Projects(this.subdomain, this.authToken)
          },
        },
        {
          key: 'timeEntries',
          value: function() {
            if (_.isEmpty(this.authToken))
              throw new Error('Undefined authToken. Please login')
            if (_.isEmpty(this.userId))
              throw new Error('Undefined user. Please login')
            return new TimeEntries(this.subdomain, this.authToken, this.userId)
          },
        },
      ]),
      t
    )
  })(),
  TimeBilling = {
    V2: function(e) {
      return new V2(e)
    },
  }
module.exports = TimeBilling
//# sourceMappingURL=ttb-node-sdk.js.map
