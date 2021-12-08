/*!
 * Copyright (c) 2017-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var oktaAuthJs = require('@okta/okta-auth-js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

var script = {
  name: 'LoginCallback',
  async beforeMount () {
    await this.$auth.handleLoginRedirect();
  },
  render () {}
};

script.__file = "src/components/LoginCallback.vue";

var packageInfo = {"name":"@okta/okta-vue","version":"3.0.0"};
function install(Vue) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      oktaAuth = _ref.oktaAuth,
      onAuthRequired = _ref.onAuthRequired;
  if (!oktaAuth) {
    throw oktaAuthJs.AuthSdkError('No oktaAuth instance passed to OktaVue.');
  }
  oktaAuth.userAgent = "".concat(packageInfo.name, "/").concat(packageInfo.version, " ").concat(oktaAuth.userAgent);
  var router;
  if (!oktaAuth.options.restoreOriginalUri) {
    oktaAuth.options.restoreOriginalUri = function () {
      var _ref2 = _asyncToGenerator__default["default"]( _regeneratorRuntime__default["default"].mark(function _callee(_, originalUri) {
        var path;
        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!router) {
                  _context.next = 3;
                  break;
                }
                path = oktaAuthJs.toRelativeUrl(originalUri, window.location.origin);
                return _context.abrupt("return", router.replace({
                  path: path
                }));
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }();
  }
  var originalUriTracker;
  var guardSecureRoute = function () {
    var _ref3 = _asyncToGenerator__default["default"]( _regeneratorRuntime__default["default"].mark(function _callee2(authState) {
      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (authState.isAuthenticated) {
                _context2.next = 9;
                break;
              }
              oktaAuth.setOriginalUri(originalUriTracker);
              if (!onAuthRequired) {
                _context2.next = 7;
                break;
              }
              _context2.next = 5;
              return onAuthRequired(oktaAuth);
            case 5:
              _context2.next = 9;
              break;
            case 7:
              _context2.next = 9;
              return oktaAuth.signInWithRedirect();
            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function guardSecureRoute(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
  Vue.mixin({
    data: function data() {
      return {
        authState: oktaAuth.authStateManager.getAuthState()
      };
    },
    created: function created() {
      router = this.$router;
      oktaAuth.authStateManager.subscribe(this.$_oktaVue_handleAuthStateUpdate);
      if (!oktaAuth.token.isLoginRedirect()) {
        oktaAuth.authStateManager.updateAuthState();
      }
    },
    beforeDestroy: function beforeDestroy() {
      oktaAuth.authStateManager.unsubscribe(this.$_oktaVue_handleAuthStateUpdate);
    },
    beforeRouteEnter: function beforeRouteEnter(to, _, next) {
      return _asyncToGenerator__default["default"]( _regeneratorRuntime__default["default"].mark(function _callee3() {
        var isRouteProtected, isAuthenticated, authState;
        return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                isRouteProtected = !to.matched.some(function (record) {
                  return record.meta.allowUnauthed;
                });
                if (!isRouteProtected) {
                  _context3.next = 16;
                  break;
                }
                originalUriTracker = to.fullPath;
                oktaAuth.authStateManager.subscribe(guardSecureRoute);
                _context3.next = 6;
                return oktaAuth.isAuthenticated();
              case 6:
                isAuthenticated = _context3.sent;
                if (isAuthenticated) {
                  _context3.next = 13;
                  break;
                }
                authState = oktaAuth.authStateManager.getAuthState();
                _context3.next = 11;
                return guardSecureRoute(authState);
              case 11:
                _context3.next = 14;
                break;
              case 13:
                next();
              case 14:
                _context3.next = 17;
                break;
              case 16:
                next();
              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    beforeRouteLeave: function beforeRouteLeave(to, from, next) {
      oktaAuth.authStateManager.unsubscribe(guardSecureRoute);
      next();
    },
    methods: {
      $_oktaVue_handleAuthStateUpdate: function $_oktaVue_handleAuthStateUpdate(authState) {
        var _this = this;
        return _asyncToGenerator__default["default"]( _regeneratorRuntime__default["default"].mark(function _callee4() {
          return _regeneratorRuntime__default["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _this.authState = Object.assign(_this.authState, authState);
                case 1:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }))();
      }
    }
  });
  Vue.prototype.$auth = oktaAuth;
}
var oktaVue = {
  install: install
};

exports.LoginCallback = script;
exports["default"] = oktaVue;
//# sourceMappingURL=okta-vue.cjs.js.map
