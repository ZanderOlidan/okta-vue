import { AuthSdkError, toRelativeUrl } from '@okta/okta-auth-js';
import { defineComponent } from 'vue';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

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
var _oktaAuth;
var _onAuthRequired;
var _router;
var originalUriTracker;
var guardSecureRoute = function (authState) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(authState && !authState.isAuthenticated)) return [3 /*break*/, 4];
                _oktaAuth.setOriginalUri(originalUriTracker);
                if (!_onAuthRequired) return [3 /*break*/, 2];
                return [4 /*yield*/, _onAuthRequired(_oktaAuth)];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, _oktaAuth.signInWithRedirect()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
var navigationGuard = function (to) { return __awaiter(void 0, void 0, void 0, function () {
    var isRouteProtected, isAuthenticated, authState;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // clear any subscribed guardSecureRoute
                _oktaAuth.authStateManager.unsubscribe(guardSecureRoute);
                isRouteProtected = !to.matched.some(function (record) { return record.meta.allowUnauthed; });
                if (!isRouteProtected) return [3 /*break*/, 4];
                // track the originalUri for guardSecureRoute
                originalUriTracker = to.fullPath;
                // subscribe to authState change to protect secure routes when authState change
                // all secure routes should subscribe before enter the route
                _oktaAuth.authStateManager.subscribe(guardSecureRoute);
                return [4 /*yield*/, _oktaAuth.isAuthenticated()];
            case 1:
                isAuthenticated = _a.sent();
                if (!!isAuthenticated) return [3 /*break*/, 3];
                authState = _oktaAuth.authStateManager.getAuthState();
                return [4 /*yield*/, guardSecureRoute(authState)];
            case 2:
                _a.sent();
                return [2 /*return*/, false];
            case 3: return [2 /*return*/, true];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
function install(app, _a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, oktaAuth = _b.oktaAuth, onAuthRequired = _b.onAuthRequired, onAuthResume = _b.onAuthResume;
    if (!oktaAuth) {
        throw new AuthSdkError('No oktaAuth instance passed to OktaVue.');
    }
    _oktaAuth = oktaAuth;
    _onAuthRequired = onAuthRequired;
    if (oktaAuth._oktaUserAgent) {
        // check major version of auth-js
        var oktaAuthVersion = oktaAuth._oktaUserAgent.getVersion();
        var oktaAuthMajorVersion = oktaAuthVersion === null || oktaAuthVersion === void 0 ? void 0 : oktaAuthVersion.split('.')[0];
        if (oktaAuthMajorVersion && oktaAuthMajorVersion !== "5") {
            throw new AuthSdkError("\n        Passed in oktaAuth is not compatible with the SDK,\n        okta-auth-js version ".concat("5", ".x is the current supported version.\n      "));
        }
        // customize user agent
        oktaAuth._oktaUserAgent.addEnvironment("".concat({"name":"@okta/okta-vue","version":"5.1.0"}.name, "/").concat({"name":"@okta/okta-vue","version":"5.1.0"}.version));
    }
    else {
        console.warn('_oktaUserAgent is not available on auth SDK instance. Please use okta-auth-js@^5.3.1 .');
    }
    // add default restoreOriginalUri callback
    if (!oktaAuth.options.restoreOriginalUri) {
        oktaAuth.options.restoreOriginalUri = function (oktaAuth, originalUri) { return __awaiter(_this, void 0, void 0, function () {
            var path;
            return __generator(this, function (_a) {
                // If a router is available, provide a default implementation
                if (_router && originalUri) {
                    path = toRelativeUrl(originalUri, window.location.origin);
                    _router.replace({ path: path });
                }
                return [2 /*return*/];
            });
        }); };
    }
    app.mixin({
        data: function () {
            return {
                authState: oktaAuth.authStateManager.getAuthState()
            };
        },
        beforeCreate: function () {
            // assign router for the default restoreOriginalUri callback
            _router = this.$router;
        },
        created: function () {
            // subscribe to the latest authState
            oktaAuth.authStateManager.subscribe(this.$_oktaVue_handleAuthStateUpdate);
            if (!oktaAuth.token.isLoginRedirect()) {
                // Calculates initial auth state and fires change event for listeners
                // Also starts the token auto-renew service
                oktaAuth.start();
            }
        },
        beforeUnmount: function () {
            oktaAuth.authStateManager.unsubscribe(this.$_oktaVue_handleAuthStateUpdate);
            oktaAuth.stop();
        },
        // private property naming convention follows
        // https://vuejs.org/v2/style-guide/#Private-property-names-essential
        methods: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            $_oktaVue_handleAuthStateUpdate: function (authState) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.authState = Object.assign(this.authState || {}, authState);
                        return [2 /*return*/];
                    });
                });
            }
        }
    });
    // add additional options to oktaAuth options
    Object.assign(oktaAuth.options, {
        onAuthRequired: onAuthRequired,
        onAuthResume: onAuthResume
    });
    // add oktaAuth instance to Vue
    app.config.globalProperties.$auth = oktaAuth;
}
var OktaVue = { install: install };

var script = defineComponent({
  name: 'LoginCallback',
  data() {
    return {
      error: null
    };
  },
  async beforeMount () {
    try {
      await this.$auth.handleLoginRedirect();
      this.$auth.start();
    } catch (e) {
      if (this.$auth.isInteractionRequiredError(e)) {
        const { onAuthResume, onAuthRequired } = this.$auth.options;
        const callbackFn = onAuthResume || onAuthRequired;
        if (callbackFn) {
          callbackFn(this.$auth);
          return;
        }
      }
      this.error = e.toString();
    }
  },
  render() {
    return this.error
  }
});

script.__file = "src/components/LoginCallback.vue";

export { script as LoginCallback, OktaVue as default, navigationGuard };
//# sourceMappingURL=okta-vue.esm.js.map
