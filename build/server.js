require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var _regenerator = __webpack_require__(1);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _toConsumableArray2 = __webpack_require__(2);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _extends2 = __webpack_require__(3);

  var _extends3 = _interopRequireDefault(_extends2);

  var _set = __webpack_require__(4);

  var _set2 = _interopRequireDefault(_set);

  var _asyncToGenerator2 = __webpack_require__(5);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _jsxFileName = '/Users/naver/workspace/excel-merge-tool/src/server.js'; /**
                                                                               * React Starter Kit (https://www.reactstarterkit.com/)
                                                                               *
                                                                               * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                               *
                                                                               * This source code is licensed under the MIT license found in the
                                                                               * LICENSE.txt file in the root directory of this source tree.
                                                                               */

  // eslint-disable-line import/no-unresolved

  __webpack_require__(6);

  var _path = __webpack_require__(7);

  var _path2 = _interopRequireDefault(_path);

  var _express = __webpack_require__(8);

  var _express2 = _interopRequireDefault(_express);

  var _cookieParser = __webpack_require__(9);

  var _cookieParser2 = _interopRequireDefault(_cookieParser);

  var _bodyParser = __webpack_require__(10);

  var _bodyParser2 = _interopRequireDefault(_bodyParser);

  var _expressJwt = __webpack_require__(11);

  var _expressJwt2 = _interopRequireDefault(_expressJwt);

  var _expressGraphql = __webpack_require__(12);

  var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

  var _jsonwebtoken = __webpack_require__(13);

  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

  var _react = __webpack_require__(14);

  var _react2 = _interopRequireDefault(_react);

  var _server = __webpack_require__(15);

  var _server2 = _interopRequireDefault(_server);

  var _reactRedux = __webpack_require__(16);

  var _universalRouter = __webpack_require__(17);

  var _universalRouter2 = _interopRequireDefault(_universalRouter);

  var _prettyError = __webpack_require__(18);

  var _prettyError2 = _interopRequireDefault(_prettyError);

  var _App = __webpack_require__(19);

  var _App2 = _interopRequireDefault(_App);

  var _Html = __webpack_require__(25);

  var _Html2 = _interopRequireDefault(_Html);

  var _ErrorPage = __webpack_require__(27);

  var _ErrorPage2 = __webpack_require__(29);

  var _ErrorPage3 = _interopRequireDefault(_ErrorPage2);

  var _passport = __webpack_require__(36);

  var _passport2 = _interopRequireDefault(_passport);

  var _models = __webpack_require__(39);

  var _models2 = _interopRequireDefault(_models);

  var _schema = __webpack_require__(47);

  var _schema2 = _interopRequireDefault(_schema);

  var _routes = __webpack_require__(53);

  var _routes2 = _interopRequireDefault(_routes);

  var _assets = __webpack_require__(73);

  var _assets2 = _interopRequireDefault(_assets);

  var _configureStore = __webpack_require__(74);

  var _configureStore2 = _interopRequireDefault(_configureStore);

  var _actions = __webpack_require__(58);

  var _config = __webpack_require__(42);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var app = (0, _express2.default)();

  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';

  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  app.use((0, _cookieParser2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());

  //
  // Authentication
  // -----------------------------------------------------------------------------
  app.use((0, _expressJwt2.default)({
    secret: _config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: function getToken(req) {
      return req.cookies.id_token;
    }
  }));
  app.use(_passport2.default.initialize());

  if (true) {
    app.enable('trust proxy');
  }
  app.get('/login/facebook', _passport2.default.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
  app.get('/login/facebook/return', _passport2.default.authenticate('facebook', { failureRedirect: '/login', session: false }), function (req, res) {
    var expiresIn = 60 * 60 * 24 * 180; // 180 days
    var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwt.secret, { expiresIn: expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  });

  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  app.use('/graphql', (0, _expressGraphql2.default)(function (req) {
    return {
      schema: _schema2.default,
      graphiql: ("development") !== 'production',
      rootValue: { request: req },
      pretty: ("development") !== 'production'
    };
  }));

  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  app.get('*', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var store, css, context, route, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              store = (0, _configureStore2.default)({
                user: req.user || null
              }, {
                cookie: req.headers.cookie
              });
              css = new _set2.default();

              // Global (context) variables that can be easily accessed from any React component
              // https://facebook.github.io/react/docs/context.html

              context = {
                // Enables critical path CSS rendering
                // https://github.com/kriasoft/isomorphic-style-loader
                insertCss: function insertCss() {
                  for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
                    styles[_key] = arguments[_key];
                  }

                  // eslint-disable-next-line no-underscore-dangle
                  styles.forEach(function (style) {
                    return css.add(style._getCss());
                  });
                }
              };
              _context.next = 6;
              return _universalRouter2.default.resolve(_routes2.default, (0, _extends3.default)({}, context, {
                path: req.path,
                query: req.query
              }));

            case 6:
              route = _context.sent;

              if (!route.redirect) {
                _context.next = 10;
                break;
              }

              res.redirect(route.status || 302, route.redirect);
              return _context.abrupt('return');

            case 10:
              data = (0, _extends3.default)({}, route);

              data.style = [].concat((0, _toConsumableArray3.default)(css)).join('');
              data.scripts = [_assets2.default.vendor.js, _assets2.default.client.js];
              if (_assets2.default[route.chunk]) {
                data.scripts.push(_assets2.default[route.chunk].js);
              }

              store.dispatch((0, _actions.getTodos)());
              store.subscribe(function () {
                data.children = _server2.default.renderToString(_react2.default.createElement(
                  _reactRedux.Provider,
                  { store: store, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 137
                    },
                    __self: undefined
                  },
                  _react2.default.createElement(
                    _App2.default,
                    { context: context, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 138
                      },
                      __self: undefined
                    },
                    route.component
                  )
                ));
                data.state = store.getState();
                var html = _server2.default.renderToStaticMarkup(_react2.default.createElement(_Html2.default, (0, _extends3.default)({}, data, {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 141
                  },
                  __self: undefined
                })));
                res.status(route.status || 200);
                res.send('<!doctype html>' + html);
              });
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context['catch'](0);

              next(_context.t0);

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 18]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());

  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');

  app.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var html = _server2.default.renderToStaticMarkup(_react2.default.createElement(
      _Html2.default,
      {
        title: 'Internal Server Error',
        description: err.message,
        style: _ErrorPage3.default._getCss() // eslint-disable-line no-underscore-dangle
        , __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        },
        __self: undefined
      },
      _server2.default.renderToString(_react2.default.createElement(_ErrorPage.ErrorPageWithoutStyle, { error: err, __source: {
          fileName: _jsxFileName,
          lineNumber: 165
        },
        __self: undefined
      }))
    ));
    res.status(err.status || 500);
    res.send('<!doctype html>' + html);
  });

  //
  // Launch the server
  // -----------------------------------------------------------------------------
  /* eslint-disable no-console */
  _models2.default.sync().catch(function (err) {
    return console.error(err.stack);
  }).then(function () {
    app.listen(_config.port, function () {
      console.log('The server is running at http://localhost:' + _config.port + '/');
    });
  });
  /* eslint-enable no-console */

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/set");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("express-jwt");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("express-graphql");

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 14 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("react-redux");

/***/ },
/* 17 */
/***/ function(module, exports) {

  module.exports = require("universal-router");

/***/ },
/* 18 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getPrototypeOf = __webpack_require__(20);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck2 = __webpack_require__(21);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass2 = __webpack_require__(22);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn2 = __webpack_require__(23);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits2 = __webpack_require__(24);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _react = __webpack_require__(14);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var ContextType = {
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    insertCss: _react.PropTypes.func.isRequired
  };

  /**
   * The top-level React component setting context (global) variables
   * that can be accessed from all the child components.
   *
   * https://facebook.github.io/react/docs/context.html
   *
   * Usage example:
   *
   *   const context = {
   *     history: createBrowserHistory(),
   *     store: createStore(),
   *   };
   *
   *   ReactDOM.render(
   *     <App context={context}>
   *       <Layout>
   *         <LandingPage />
   *       </Layout>
   *     </App>,
   *     container,
   *   );
   */
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

  var App = function (_React$PureComponent) {
    (0, _inherits3.default)(App, _React$PureComponent);

    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).apply(this, arguments));
    }

    (0, _createClass3.default)(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return this.props.context;
      }
    }, {
      key: 'render',
      value: function render() {
        // NOTE: If you need to add or modify header, footer etc. of the app,
        // please do that inside the Layout component.
        return _react.Children.only(this.props.children);
      }
    }]);
    return App;
  }(_react2.default.PureComponent);

  App.propTypes = {
    context: _react.PropTypes.shape(ContextType).isRequired,
    children: _react.PropTypes.element.isRequired
  };
  App.childContextTypes = ContextType;
    exports.default = App;

/***/ },
/* 20 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 21 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 22 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 23 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 24 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getPrototypeOf = __webpack_require__(20);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck2 = __webpack_require__(21);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass2 = __webpack_require__(22);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn2 = __webpack_require__(23);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits2 = __webpack_require__(24);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _jsxFileName = '/Users/naver/workspace/excel-merge-tool/src/components/Html.js'; /**
                                                                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                        *
                                                                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                        *
                                                                                        * This source code is licensed under the MIT license found in the
                                                                                        * LICENSE.txt file in the root directory of this source tree.
                                                                                        */

  var _react = __webpack_require__(14);

  var _react2 = _interopRequireDefault(_react);

  var _serializeJavascript = __webpack_require__(26);

  var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var Html = function (_React$Component) {
    (0, _inherits3.default)(Html, _React$Component);

    function Html() {
      (0, _classCallCheck3.default)(this, Html);
      return (0, _possibleConstructorReturn3.default)(this, (Html.__proto__ || (0, _getPrototypeOf2.default)(Html)).apply(this, arguments));
    }

    (0, _createClass3.default)(Html, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            title = _props.title,
            description = _props.description,
            style = _props.style,
            scripts = _props.scripts,
            state = _props.state,
            children = _props.children;

        return _react2.default.createElement(
          'html',
          { className: 'no-js', lang: 'en', __source: {
              fileName: _jsxFileName,
              lineNumber: 26
            },
            __self: this
          },
          _react2.default.createElement(
            'head',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 27
              },
              __self: this
            },
            _react2.default.createElement('meta', { charSet: 'utf-8', __source: {
                fileName: _jsxFileName,
                lineNumber: 28
              },
              __self: this
            }),
            _react2.default.createElement('meta', { httpEquiv: 'x-ua-compatible', content: 'ie=edge', __source: {
                fileName: _jsxFileName,
                lineNumber: 29
              },
              __self: this
            }),
            _react2.default.createElement(
              'title',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 30
                },
                __self: this
              },
              title
            ),
            _react2.default.createElement('meta', { name: 'description', content: description, __source: {
                fileName: _jsxFileName,
                lineNumber: 31
              },
              __self: this
            }),
            _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', __source: {
                fileName: _jsxFileName,
                lineNumber: 32
              },
              __self: this
            }),
            _react2.default.createElement('link', { href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', rel: 'stylesheet', __source: {
                fileName: _jsxFileName,
                lineNumber: 33
              },
              __self: this
            }),
            _react2.default.createElement('link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png', __source: {
                fileName: _jsxFileName,
                lineNumber: 34
              },
              __self: this
            }),
            style && _react2.default.createElement('style', { id: 'css', dangerouslySetInnerHTML: { __html: style }, __source: {
                fileName: _jsxFileName,
                lineNumber: 35
              },
              __self: this
            })
          ),
          _react2.default.createElement(
            'body',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 37
              },
              __self: this
            },
            _react2.default.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: children }, __source: {
                fileName: _jsxFileName,
                lineNumber: 38
              },
              __self: this
            }),
            state && _react2.default.createElement('script', {
              dangerouslySetInnerHTML: { __html: 'window.APP_STATE=' + (0, _serializeJavascript2.default)(state, { isJSON: true }) },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 40
              },
              __self: this
            }),
            scripts && scripts.map(function (script) {
              return _react2.default.createElement('script', { key: script, src: script, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 45
                },
                __self: _this2
              });
            })
          )
        );
      }
    }]);
    return Html;
  }(_react2.default.Component);

  Html.propTypes = {
    title: _react.PropTypes.string.isRequired,
    description: _react.PropTypes.string.isRequired,
    style: _react.PropTypes.string,
    scripts: _react.PropTypes.arrayOf(_react.PropTypes.string.isRequired),
    state: _react.PropTypes.object,
    children: _react.PropTypes.string
  };
    exports.default = Html;

/***/ },
/* 26 */
/***/ function(module, exports) {

  module.exports = require("serialize-javascript");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ErrorPageWithoutStyle = undefined;

  var _getPrototypeOf = __webpack_require__(20);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck2 = __webpack_require__(21);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass2 = __webpack_require__(22);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn2 = __webpack_require__(23);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits2 = __webpack_require__(24);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _jsxFileName = '/Users/naver/workspace/excel-merge-tool/src/routes/error/ErrorPage.js'; /**
                                                                                               * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                               *
                                                                                               * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                               *
                                                                                               * This source code is licensed under the MIT license found in the
                                                                                               * LICENSE.txt file in the root directory of this source tree.
                                                                                               */

  var _react = __webpack_require__(14);

  var _react2 = _interopRequireDefault(_react);

  var _withStyles = __webpack_require__(28);

  var _withStyles2 = _interopRequireDefault(_withStyles);

  var _ErrorPage = __webpack_require__(29);

  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var ErrorPage = function (_React$Component) {
    (0, _inherits3.default)(ErrorPage, _React$Component);

    function ErrorPage() {
      (0, _classCallCheck3.default)(this, ErrorPage);
      return (0, _possibleConstructorReturn3.default)(this, (ErrorPage.__proto__ || (0, _getPrototypeOf2.default)(ErrorPage)).apply(this, arguments));
    }

    (0, _createClass3.default)(ErrorPage, [{
      key: 'render',
      value: function render() {
        if (true) {
          var error = this.props.error;

          return _react2.default.createElement(
            'div',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 23
              },
              __self: this
            },
            _react2.default.createElement(
              'h1',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 24
                },
                __self: this
              },
              error.name
            ),
            _react2.default.createElement(
              'p',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 25
                },
                __self: this
              },
              error.message
            ),
            _react2.default.createElement(
              'pre',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 26
                },
                __self: this
              },
              error.stack
            )
          );
        }

        return _react2.default.createElement(
          'div',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 32
            },
            __self: this
          },
          _react2.default.createElement(
            'h1',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 33
              },
              __self: this
            },
            'Error'
          ),
          _react2.default.createElement(
            'p',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 34
              },
              __self: this
            },
            'Sorry, a critical error occurred on this page.'
          )
        );
      }
    }]);
    return ErrorPage;
  }(_react2.default.Component);

  ErrorPage.propTypes = {
    error: _react.PropTypes.object.isRequired
  };
  exports.ErrorPageWithoutStyle = ErrorPage;
  exports.default = (0, _withStyles2.default)(_ErrorPage2.default)(ErrorPage);

/***/ },
/* 28 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(30);
      var insertCss = __webpack_require__(32);

      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }

      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]-[local]-[hash:base64:5]\",\"minimize\":false,\"discardComments\":{\"removeAll\":true}}!../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css", function() {
          content = require("!!../../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]-[local]-[hash:base64:5]\",\"minimize\":false,\"discardComments\":{\"removeAll\":true}}!../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css");

          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }

          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports


  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  padding: 2em;\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 32px;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n}\n", "", {"version":3,"sources":["/Users/naver/workspace/excel-merge-tool/src/routes/error/ErrorPage.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,iBAAiB;EACjB,UAAU;CACX;;AAED;EACE,YAAY;EACZ,eAAe;EACf,wBAAwB;EACxB,aAAa;EACb,mBAAmB;EACnB,YAAY;CACb;;AAED;EACE,oBAAoB;EACpB,uBAAuB;EACvB,aAAa;CACd;;AAED;EACE,YAAY;EACZ,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;EACE,iBAAiB;EACjB,iBAAiB;EAAjB,iBAAiB;CAClB;;AAED;EACE;;IAEE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;CACF","file":"ErrorPage.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  padding: 2em;\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n}\n"],"sourceRoot":""}]);

  // exports


/***/ },
/* 31 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];

  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};

  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var _stringify = __webpack_require__(33);

  var _stringify2 = _interopRequireDefault(_stringify);

  var _slicedToArray2 = __webpack_require__(34);

  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

  var _getIterator2 = __webpack_require__(35);

  var _getIterator3 = _interopRequireDefault(_getIterator2);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

  var prefix = 's';
  var inserted = {};

  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }

  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;

        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$replace = _ref.replace,
        replace = _ref$replace === undefined ? false : _ref$replace,
        _ref$prepend = _ref.prepend,
        prepend = _ref$prepend === undefined ? false : _ref$prepend;

    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
          moduleId = _styles$i[0],
          css = _styles$i[1],
          media = _styles$i[2],
          sourceMap = _styles$i[3];

      var id = moduleId + '-' + i;

      ids.push(id);

      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }

      inserted[id] = 1;

      var elem = document.getElementById(prefix + id);
      var create = false;

      if (!elem) {
        create = true;

        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;

        if (media) {
          elem.setAttribute('media', media);
        }
      }

      var cssText = css;
      if (sourceMap && btoa) {
        // skip IE9 and below, see http://caniuse.com/atob-btoa
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
      }

      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }

      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }

    return removeCss.bind(null, ids);
  }

  module.exports = insertCss;

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 34 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 35 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _regenerator = __webpack_require__(1);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator2 = __webpack_require__(5);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _passport = __webpack_require__(37);

  var _passport2 = _interopRequireDefault(_passport);

  var _passportFacebook = __webpack_require__(38);

  var _models = __webpack_require__(39);

  var _config = __webpack_require__(42);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * Sign in with Facebook.
   */
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

  /**
   * Passport.js reference implementation.
   * The database schema used in this sample is available at
   * https://github.com/membership/membership.db/tree/master/postgres
   */

  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: _config.auth.facebook.id,
    clientSecret: _config.auth.facebook.secret,
    callbackURL: '/login/facebook/return',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    /* eslint-disable no-underscore-dangle */
    var loginName = 'facebook';
    var claimType = 'urn:facebook:access_token';
    var fooBar = function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var userLogin, user, users, _user;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.user) {
                  _context.next = 14;
                  break;
                }

                _context.next = 3;
                return _models.UserLogin.findOne({
                  attributes: ['name', 'key'],
                  where: { name: loginName, key: profile.id }
                });

              case 3:
                userLogin = _context.sent;

                if (!userLogin) {
                  _context.next = 8;
                  break;
                }

                // There is already a Facebook account that belongs to you.
                // Sign in with that account or delete it, then link it with your current account.
                done();
                _context.next = 12;
                break;

              case 8:
                _context.next = 10;
                return _models.User.create({
                  id: req.user.id,
                  email: profile._json.email,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: profile.id }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: _models.UserLogin, as: 'logins' }, { model: _models.UserClaim, as: 'claims' }, { model: _models.UserProfile, as: 'profile' }]
                });

              case 10:
                user = _context.sent;

                done(null, {
                  id: user.id,
                  email: user.email
                });

              case 12:
                _context.next = 32;
                break;

              case 14:
                _context.next = 16;
                return _models.User.findAll({
                  attributes: ['id', 'email'],
                  where: { '$logins.name$': loginName, '$logins.key$': profile.id },
                  include: [{
                    attributes: ['name', 'key'],
                    model: _models.UserLogin,
                    as: 'logins',
                    required: true
                  }]
                });

              case 16:
                users = _context.sent;

                if (!users.length) {
                  _context.next = 21;
                  break;
                }

                done(null, users[0]);
                _context.next = 32;
                break;

              case 21:
                _context.next = 23;
                return _models.User.findOne({ where: { email: profile._json.email } });

              case 23:
                _user = _context.sent;

                if (!_user) {
                  _context.next = 28;
                  break;
                }

                // There is already an account using this email address. Sign in to
                // that account and link it with Facebook manually from Account Settings.
                done(null);
                _context.next = 32;
                break;

              case 28:
                _context.next = 30;
                return _models.User.create({
                  email: profile._json.email,
                  emailConfirmed: true,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: accessToken }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: _models.UserLogin, as: 'logins' }, { model: _models.UserClaim, as: 'claims' }, { model: _models.UserProfile, as: 'profile' }]
                });

              case 30:
                _user = _context.sent;

                done(null, {
                  id: _user.id,
                  email: _user.email
                });

              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function fooBar() {
        return _ref.apply(this, arguments);
      };
    }();

    fooBar().catch(done);
  }));

  exports.default = _passport2.default;

/***/ },
/* 37 */
/***/ function(module, exports) {

  module.exports = require("passport");

/***/ },
/* 38 */
/***/ function(module, exports) {

  module.exports = require("passport-facebook");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UserProfile = exports.UserClaim = exports.UserLogin = exports.User = undefined;

  var _sequelize = __webpack_require__(40);

  var _sequelize2 = _interopRequireDefault(_sequelize);

  var _User = __webpack_require__(43);

  var _User2 = _interopRequireDefault(_User);

  var _UserLogin = __webpack_require__(44);

  var _UserLogin2 = _interopRequireDefault(_UserLogin);

  var _UserClaim = __webpack_require__(45);

  var _UserClaim2 = _interopRequireDefault(_UserClaim);

  var _UserProfile = __webpack_require__(46);

  var _UserProfile2 = _interopRequireDefault(_UserProfile);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  _User2.default.hasMany(_UserLogin2.default, {
    foreignKey: 'userId',
    as: 'logins',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */

  _User2.default.hasMany(_UserClaim2.default, {
    foreignKey: 'userId',
    as: 'claims',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });

  _User2.default.hasOne(_UserProfile2.default, {
    foreignKey: 'userId',
    as: 'profile',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });

  function sync() {
    return _sequelize2.default.sync.apply(_sequelize2.default, arguments);
  }

  exports.default = { sync: sync };
  exports.User = _User2.default;
  exports.UserLogin = _UserLogin2.default;
  exports.UserClaim = _UserClaim2.default;
    exports.UserProfile = _UserProfile2.default;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _sequelize = __webpack_require__(41);

  var _sequelize2 = _interopRequireDefault(_sequelize);

  var _config = __webpack_require__(42);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

  var sequelize = new _sequelize2.default(_config.databaseUrl, {
    define: {
      freezeTableName: true
    }
  });

    exports.default = sequelize;

/***/ },
/* 41 */
/***/ function(module, exports) {

  module.exports = require("sequelize");

/***/ },
/* 42 */
/***/ function(module, exports) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

  /* eslint-disable max-len */

  var port = exports.port = process.env.PORT || 3000;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;

  var databaseUrl = exports.databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';

  var analytics = exports.analytics = {

    // https://analytics.google.com/
    google: {
      trackingId: process.env.GOOGLE_TRACKING_ID }

  };

  var auth = exports.auth = {

    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },

    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }

    };

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _sequelize = __webpack_require__(41);

  var _sequelize2 = _interopRequireDefault(_sequelize);

  var _sequelize3 = __webpack_require__(40);

  var _sequelize4 = _interopRequireDefault(_sequelize3);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

  var User = _sequelize4.default.define('User', {

    id: {
      type: _sequelize2.default.UUID,
      defaultValue: _sequelize2.default.UUIDV1,
      primaryKey: true
    },

    email: {
      type: _sequelize2.default.STRING(255),
      validate: { isEmail: true }
    },

    emailConfirmed: {
      type: _sequelize2.default.BOOLEAN,
      defaultValue: false
    }

  }, {

    indexes: [{ fields: ['email'] }]

  });

    exports.default = User;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _sequelize = __webpack_require__(41);

  var _sequelize2 = _interopRequireDefault(_sequelize);

  var _sequelize3 = __webpack_require__(40);

  var _sequelize4 = _interopRequireDefault(_sequelize3);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

  var UserLogin = _sequelize4.default.define('UserLogin', {

    name: {
      type: _sequelize2.default.STRING(50),
      primaryKey: true
    },

    key: {
      type: _sequelize2.default.STRING(100),
      primaryKey: true
    }

  });

    exports.default = UserLogin;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _sequelize = __webpack_require__(41);

  var _sequelize2 = _interopRequireDefault(_sequelize);

  var _sequelize3 = __webpack_require__(40);

  var _sequelize4 = _interopRequireDefault(_sequelize3);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

  var UserClaim = _sequelize4.default.define('UserClaim', {

    type: {
      type: _sequelize2.default.STRING
    },

    value: {
      type: _sequelize2.default.STRING
    }

  });

    exports.default = UserClaim;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _sequelize = __webpack_require__(41);

  var _sequelize2 = _interopRequireDefault(_sequelize);

  var _sequelize3 = __webpack_require__(40);

  var _sequelize4 = _interopRequireDefault(_sequelize3);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var UserProfile = _sequelize4.default.define('UserProfile', {

    userId: {
      type: _sequelize2.default.UUID,
      primaryKey: true
    },

    displayName: {
      type: _sequelize2.default.STRING(100)
    },

    picture: {
      type: _sequelize2.default.STRING(255)
    },

    gender: {
      type: _sequelize2.default.STRING(50)
    },

    location: {
      type: _sequelize2.default.STRING(100)
    },

    website: {
      type: _sequelize2.default.STRING(255)
    }

  });

    exports.default = UserProfile;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _graphql = __webpack_require__(48);

  var _todo = __webpack_require__(49);

  var _todo2 = _interopRequireDefault(_todo);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

  var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
      name: 'Query',
      fields: {
        todo: _todo2.default
      }
    })
  });

    exports.default = schema;

/***/ },
/* 48 */
/***/ function(module, exports) {

  module.exports = require("graphql");

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _regenerator = __webpack_require__(1);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator2 = __webpack_require__(5);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _graphql = __webpack_require__(48);

  var _fs = __webpack_require__(50);

  var _fs2 = _interopRequireDefault(_fs);

  var _bluebird = __webpack_require__(51);

  var _bluebird2 = _interopRequireDefault(_bluebird);

  var _TodoType = __webpack_require__(52);

  var _TodoType2 = _interopRequireDefault(_TodoType);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

  var filename = 'todo.json';
  var readFile = _bluebird2.default.promisify(_fs2.default.readFile);

  var todo = {
    type: new _graphql.GraphQLList(_TodoType2.default),
    resolve: function resolve() {
      var _this = this;

      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var todos;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return readFile(filename);

              case 2:
                todos = _context.sent;
                return _context.abrupt('return', JSON.parse(todos));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

    exports.default = todo;

/***/ },
/* 50 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 51 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _graphql = __webpack_require__(48);

  var TodoType = new _graphql.GraphQLObjectType({
    name: 'Todo',
    fields: {
      text: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */

    exports.default = TodoType;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _regenerator = __webpack_require__(1);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator2 = __webpack_require__(5);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

  /* eslint-disable global-require */

  // The top-level (parent) route
  exports.default = {

    path: '/',

    // Keep in mind, routes are evaluated in order
    children: [__webpack_require__(54).default, __webpack_require__(69).default],

    action: function action(_ref) {
      var _this = this;

      var next = _ref.next;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var route;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();

              case 2:
                route = _context.sent;


                // Provide default values for title, description etc.
                route.title = '' + (route.title || 'Untitled Page');
                route.description = route.description || '';

                return _context.abrupt('return', route);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
    };

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _regenerator = __webpack_require__(1);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator2 = __webpack_require__(5);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _jsxFileName = '/Users/naver/workspace/excel-merge-tool/src/routes/todo/index.js'; /**
                                                                                          * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                          *
                                                                                          * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                          *
                                                                                          * This source code is licensed under the MIT license found in the
                                                                                          * LICENSE.txt file in the root directory of this source tree.
                                                                                          */

  var _react = __webpack_require__(14);

  var _react2 = _interopRequireDefault(_react);

  var _Layout = __webpack_require__(55);

  var _Layout2 = _interopRequireDefault(_Layout);

  var _DropZoneDemo = __webpack_require__(62);

  var _DropZoneDemo2 = _interopRequireDefault(_DropZoneDemo);

  var _DropZone = __webpack_require__(64);

  var _DropZone2 = _interopRequireDefault(_DropZone);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = {
    path: '/',

    action: function action() {
      var _this = this;

      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', {
                  title: 'React Todo',
                  description: 'React Todo Example',
                  component: _react2.default.createElement(_DropZoneDemo2.default, {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 22
                    },
                    __self: _this
                  })
                });

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
    };

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getPrototypeOf = __webpack_require__(20);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck2 = __webpack_require__(21);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass2 = __webpack_require__(22);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn2 = __webpack_require__(23);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits2 = __webpack_require__(24);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _jsxFileName = '/Users/naver/workspace/excel-merge-tool/src/components/Layout/Layout.js';

  var _react = __webpack_require__(14);

  var _react2 = _interopRequireDefault(_react);

  var _AddTodo = __webpack_require__(56);

  var _AddTodo2 = _interopRequireDefault(_AddTodo);

  var _TodoList = __webpack_require__(59);

  var _TodoList2 = _interopRequireDefault(_TodoList);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var Layout = function (_React$Component) {
    (0, _inherits3.default)(Layout, _React$Component);

    function Layout() {
      (0, _classCallCheck3.default)(this, Layout);
      return (0, _possibleConstructorReturn3.default)(this, (Layout.__proto__ || (0, _getPrototypeOf2.default)(Layout)).apply(this, arguments));
    }

    (0, _createClass3.default)(Layout, [{
      key: 'componentDidMount',
      value: function componentDidMount() {}
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {}
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'container', __source: {
              fileName: _jsxFileName,
              lineNumber: 14
            },
            __self: this
          },
          _react2.default.createElement(
            'div',
            { className: 'row', __source: {
                fileName: _jsxFileName,
                lineNumber: 15
              },
              __self: this
            },
            _react2.default.createElement(
              'div',
              { className: 'col-xs-12 col-sm-6 col-sm-offset-3', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 16
                },
                __self: this
              },
              _react2.default.createElement(
                'div',
                { className: 'panel panel-default', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 17
                  },
                  __self: this
                },
                _react2.default.createElement(
                  'div',
                  { className: 'panel-heading', __source: {
                      fileName: _jsxFileName,
                      lineNumber: 18
                    },
                    __self: this
                  },
                  _react2.default.createElement(
                    'h4',
                    { className: 'text-center', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 19
                      },
                      __self: this
                    },
                    'React Todo Example'
                  ),
                  _react2.default.createElement(_AddTodo2.default, {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 20
                    },
                    __self: this
                  })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'panel-body', __source: {
                      fileName: _jsxFileName,
                      lineNumber: 22
                    },
                    __self: this
                  },
                  _react2.default.createElement(_TodoList2.default, {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 23
                    },
                    __self: this
                  })
                )
              )
            )
          )
        );
      }
    }]);
    return Layout;
  }(_react2.default.Component);

    exports.default = Layout;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getPrototypeOf = __webpack_require__(20);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck2 = __webpack_require__(21);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass2 = __webpack_require__(22);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn2 = __webpack_require__(23);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits2 = __webpack_require__(24);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _jsxFileName = '/Users/naver/workspace/excel-merge-tool/src/components/AddTodo/AddTodo.js';

  var _react = __webpack_require__(14);

  var _react2 = _interopRequireDefault(_react);

  var _redux = __webpack_require__(57);

  var _reactRedux = __webpack_require__(16);

  var _actions = __webpack_require__(58);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var AddTodo = function (_React$Component) {
    (0, _inherits3.default)(AddTodo, _React$Component);

    function AddTodo() {
      (0, _classCallCheck3.default)(this, AddTodo);
      return (0, _possibleConstructorReturn3.default)(this, (AddTodo.__proto__ || (0, _getPrototypeOf2.default)(AddTodo)).apply(this, arguments));
    }

    (0, _createClass3.default)(AddTodo, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 9
            },
            __self: this
          },
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              onClick: this.props.showEditor,
              className: 'btn btn-link btn-block btn-lg',
              __source: {
                fileName: _jsxFileName,
                lineNumber: 10
              },
              __self: this
            },
            _react2.default.createElement('span', {
              className: 'glyphicon glyphicon-plus',
              'aria-hidden': 'true',
              __source: {
                fileName: _jsxFileName,
                lineNumber: 15
              },
              __self: this
            })
          )
        );
      }
    }]);
    return AddTodo;
  }(_react2.default.Component);

  AddTodo.propTypes = {
    showEditor: _react.PropTypes.func
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      showEditor: (0, _redux.bindActionCreators)(_actions.showEditor, dispatch)
    };
  };

    exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(AddTodo);

/***/ },
/* 57 */
/***/ function(module, exports) {

  module.exports = require("redux");

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _regenerator = __webpack_require__(1);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator2 = __webpack_require__(5);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  exports.addTodo = addTodo;
  exports.deleteTodo = deleteTodo;
  exports.getTodos = getTodos;
  exports.showEditor = showEditor;
  exports.hideEditor = hideEditor;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function addTodo(text) {
    return {
      type: 'ADD_TODO',
      text: text
    };
  }

  function deleteTodo(index) {
    return {
      type: 'DELETE_TODO',
      index: index
    };
  }

  function receiveTodos(todos) {
    return {
      type: 'RECEIVE_TODOS',
      todos: todos
    };
  }

  function getTodos() {
    var _this = this;

    return function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dispatch, getState, _ref2) {
        var graphqlRequest = _ref2.graphqlRequest;

        var _ref3, data;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return graphqlRequest('{todo{text}}');

              case 2:
                _ref3 = _context.sent;
                data = _ref3.data;

                dispatch(receiveTodos(data.todo));

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }();
  }

  function showEditor() {
    return {
      type: 'SHOW_EDITOR'
    };
  }

  function hideEditor() {
    return {
      type: 'HIDE_EDITOR'
    };
    }

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getPrototypeOf = __webpack_require__(20);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck2 = __webpack_require__(21);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass2 = __webpack_require__(22);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn2 = __webpack_require__(23);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits2 = __webpack_require__(24);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _jsxFileName = '/Users/naver/workspace/excel-merge-tool/src/components/TodoList/TodoList.js';

  var _react = __webpack_require__(14);

  var _react2 = _interopRequireDefault(_react);

  var _redux = __webpack_require__(57);

  var _reactRedux = __webpack_require__(16);

  var _Editor = __webpack_require__(60);

  var _Editor2 = _interopRequireDefault(_Editor);

  var _TodoItem = __webpack_require__(61);

  var _TodoItem2 = _interopRequireDefault(_TodoItem);

  var _actions = __webpack_require__(58);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var TodoList = function (_React$Component) {
    (0, _inherits3.default)(TodoList, _React$Component);

    function TodoList() {
      (0, _classCallCheck3.default)(this, TodoList);
      return (0, _possibleConstructorReturn3.default)(this, (TodoList.__proto__ || (0, _getPrototypeOf2.default)(TodoList)).apply(this, arguments));
    }

    (0, _createClass3.default)(TodoList, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var rows = this.props.todos.map(function (item, index) {
          return _react2.default.createElement(_TodoItem2.default, { key: index, index: index, item: item, __source: {
              fileName: _jsxFileName,
              lineNumber: 11
            },
            __self: _this2
          });
        });

        if (this.props.adding) {
          rows.push(_react2.default.createElement(_Editor2.default, { key: -1, __source: {
              fileName: _jsxFileName,
              lineNumber: 14
            },
            __self: this
          }));
        }

        return _react2.default.createElement(
          'table',
          { className: 'table', __source: {
              fileName: _jsxFileName,
              lineNumber: 18
            },
            __self: this
          },
          _react2.default.createElement(
            'tbody',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 19
              },
              __self: this
            },
            rows
          )
        );
      }
    }]);
    return TodoList;
  }(_react2.default.Component);

  TodoList.propTypes = {
    todos: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
    adding: _react.PropTypes.bool,
    getTodos: _react.PropTypes.func
  };

  var mapStateToProps = function mapStateToProps(state) {
    return {
      todos: state.todos,
      adding: state.adding
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      getTodos: (0, _redux.bindActionCreators)(_actions.getTodos, dispatch)
    };
  };

    exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TodoList);

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getPrototypeOf = __webpack_require__(20);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck2 = __webpack_require__(21);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass2 = __webpack_require__(22);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn2 = __webpack_require__(23);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits2 = __webpack_require__(24);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _jsxFileName = '/Users/naver/workspace/excel-merge-tool/src/components/Editor/Editor.js';

  var _react = __webpack_require__(14);

  var _react2 = _interopRequireDefault(_react);

  var _redux = __webpack_require__(57);

  var _reactRedux = __webpack_require__(16);

  var _actions = __webpack_require__(58);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var Editor = function (_React$Component) {
    (0, _inherits3.default)(Editor, _React$Component);

    function Editor(props) {
      (0, _classCallCheck3.default)(this, Editor);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Editor.__proto__ || (0, _getPrototypeOf2.default)(Editor)).call(this, props));

      _this.updateText = function (event) {
        _this.setState({
          text: event.target.value
        });
      };

      _this.catchEnter = function (event) {
        if (event.keyCode === 13) {
          _this.props.addTodo(_this.state.text);
          _this.props.hideEditor();
        }
      };

      _this.add = function () {
        _this.props.addTodo(_this.state.text);
        _this.props.hideEditor();
      };

      _this.state = {
        text: ''
      };
      return _this;
    }

    (0, _createClass3.default)(Editor, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'tr',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 34
            },
            __self: this
          },
          _react2.default.createElement(
            'td',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 35
              },
              __self: this
            },
            _react2.default.createElement('input', {
              type: 'text',
              value: this.state.text,
              onChange: this.updateText,
              onKeyDown: this.catchEnter,
              placeholder: 'Add new todo...',
              className: 'form-control',
              autoFocus: 'true',
              __source: {
                fileName: _jsxFileName,
                lineNumber: 36
              },
              __self: this
            })
          ),
          _react2.default.createElement(
            'td',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 46
              },
              __self: this
            },
            _react2.default.createElement(
              'button',
              {
                type: 'button',
                onClick: this.add,
                className: 'btn btn-link pull-right',
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 47
                },
                __self: this
              },
              _react2.default.createElement('span', {
                className: 'glyphicon glyphicon-plus',
                'aria-hidden': 'true',
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 52
                },
                __self: this
              })
            )
          )
        );
      }
    }]);
    return Editor;
  }(_react2.default.Component);

  Editor.propTypes = {
    addTodo: _react.PropTypes.func,
    hideEditor: _react.PropTypes.func
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      addTodo: (0, _redux.bindActionCreators)(_actions.addTodo, dispatch),
      hideEditor: (0, _redux.bindActionCreators)(_actions.hideEditor, dispatch)
    };
  };

    exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(Editor);

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getPrototypeOf = __webpack_require__(20);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck2 = __webpack_require__(21);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass2 = __webpack_require__(22);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn2 = __webpack_require__(23);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits2 = __webpack_require__(24);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _jsxFileName = '/Users/naver/workspace/excel-merge-tool/src/components/TodoItem/TodoItem.js';

  var _react = __webpack_require__(14);

  var _react2 = _interopRequireDefault(_react);

  var _redux = __webpack_require__(57);

  var _reactRedux = __webpack_require__(16);

  var _actions = __webpack_require__(58);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var TodoItem = function (_React$Component) {
    (0, _inherits3.default)(TodoItem, _React$Component);

    function TodoItem() {
      var _ref;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, TodoItem);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TodoItem.__proto__ || (0, _getPrototypeOf2.default)(TodoItem)).call.apply(_ref, [this].concat(args))), _this), _this.delete = function () {
        _this.props.deleteTodo(_this.props.index);
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(TodoItem, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'tr',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 13
            },
            __self: this
          },
          _react2.default.createElement(
            'td',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 14
              },
              __self: this
            },
            this.props.item.text
          ),
          _react2.default.createElement(
            'td',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 15
              },
              __self: this
            },
            _react2.default.createElement(
              'button',
              {
                type: 'button',
                onClick: this.delete,
                className: 'btn btn-link pull-right',
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 16
                },
                __self: this
              },
              _react2.default.createElement('span', {
                className: 'glyphicon glyphicon-remove',
                'aria-hidden': 'true',
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 21
                },
                __self: this
              })
            )
          )
        );
      }
    }]);
    return TodoItem;
  }(_react2.default.Component);

  TodoItem.propTypes = {
    index: _react2.default.PropTypes.number,
    item: _react2.default.PropTypes.object,
    deleteTodo: _react.PropTypes.func
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      deleteTodo: (0, _redux.bindActionCreators)(_actions.deleteTodo, dispatch)
    };
  };

    exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(TodoItem);

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _concat = __webpack_require__(63);

  var _concat2 = _interopRequireDefault(_concat);

  var _getPrototypeOf = __webpack_require__(20);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck2 = __webpack_require__(21);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass2 = __webpack_require__(22);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn2 = __webpack_require__(23);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits2 = __webpack_require__(24);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _jsxFileName = '/Users/naver/workspace/excel-merge-tool/src/components/DropZoneDemo/DropZoneDemo.js';

  var _react = __webpack_require__(14);

  var _react2 = _interopRequireDefault(_react);

  var _xlsxStyle = __webpack_require__(67);

  var _xlsxStyle2 = _interopRequireDefault(_xlsxStyle);

  var _fileSaver = __webpack_require__(68);

  var _fileSaver2 = _interopRequireDefault(_fileSaver);

  var _DropZone = __webpack_require__(64);

  var _DropZone2 = _interopRequireDefault(_DropZone);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  //import xlsx from 'xlsx'

  var DropZoneDemo = function (_Component) {
    (0, _inherits3.default)(DropZoneDemo, _Component);

    function DropZoneDemo() {
      (0, _classCallCheck3.default)(this, DropZoneDemo);

      var _this = (0, _possibleConstructorReturn3.default)(this, (DropZoneDemo.__proto__ || (0, _getPrototypeOf2.default)(DropZoneDemo)).call(this));

      _this.onDrop = function (files) {
        console.log(files[files.length - 1]);
        _this.setState({
          files: (0, _concat2.default)(_this.state.files, files)
        });
      };

      _this.openFile = function () {
        var files = _this.state.files;

        var reader = new FileReader();

        reader.onloadend = function () {
          var data = _xlsxStyle2.default.read(reader.result, { type: 'binary' });
          var wopts = { bookType: 'xlsx', cellDates: true, bookSST: true, compression: true, type: 'binary' };
          var wbout = _xlsxStyle2.default.write(data, wopts);

          function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i !== s.length; ++i) {
              view[i] = s.charCodeAt(i) & 0xFF;
            }return buf;
          }

          _fileSaver2.default.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'test.xlsx');
        };
        reader.readAsBinaryString(files[0]);
      };

      _this.onOpenClick = function () {
        _this.refs.dropzone.open();
      };

      _this.state = {
        files: []
      };
      return _this;
    }

    (0, _createClass3.default)(DropZoneDemo, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var files = this.state.files;


        return _react2.default.createElement(
          'div',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 52
            },
            __self: this
          },
          _react2.default.createElement(_DropZone2.default, { ref: 'dropzone', onDrop: this.onDrop, __source: {
              fileName: _jsxFileName,
              lineNumber: 53
            },
            __self: this
          }),
          _react2.default.createElement(
            'button',
            { onClick: this.openFile, __source: {
                fileName: _jsxFileName,
                lineNumber: 54
              },
              __self: this
            },
            'File Open'
          ),
          _react2.default.createElement(
            'div',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 55
              },
              __self: this
            },
            _react2.default.createElement(
              'h2',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 56
                },
                __self: this
              },
              'Uploaded ',
              files.length,
              ' files'
            ),
            _react2.default.createElement(
              'div',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 57
                },
                __self: this
              },
              files.map(function (file, index) {
                return _react2.default.createElement('img', { key: index, src: file.preview, width: 200, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 58
                  },
                  __self: _this2
                });
              })
            )
          )
        );
      }
    }]);
    return DropZoneDemo;
  }(_react.Component);

    exports.default = DropZoneDemo;

/***/ },
/* 63 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/array/concat");

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends2 = __webpack_require__(3);

  var _extends3 = _interopRequireDefault(_extends2);

  var _objectWithoutProperties2 = __webpack_require__(65);

  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

  var _getPrototypeOf = __webpack_require__(20);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck2 = __webpack_require__(21);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _possibleConstructorReturn2 = __webpack_require__(23);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _createClass2 = __webpack_require__(22);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _inherits2 = __webpack_require__(24);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _jsxFileName = '/Users/naver/workspace/excel-merge-tool/src/components/DropZone/DropZone.js'; /* eslint prefer-template: 0 */

  var _react = __webpack_require__(14);

  var _react2 = _interopRequireDefault(_react);

  var _attrAccept = __webpack_require__(66);

  var _attrAccept2 = _interopRequireDefault(_attrAccept);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var supportMultiple = typeof document !== 'undefined' && document && document.createElement ? 'multiple' in document.createElement('input') : true;

  var Dropzone = function (_React$Component) {
    (0, _inherits3.default)(Dropzone, _React$Component);
    (0, _createClass3.default)(Dropzone, null, [{
      key: 'onDocumentDragOver',
      value: function onDocumentDragOver(e) {
        // allow the entire document to be a drag target
        e.preventDefault();
      }
    }]);

    function Dropzone(props, context) {
      (0, _classCallCheck3.default)(this, Dropzone);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Dropzone.__proto__ || (0, _getPrototypeOf2.default)(Dropzone)).call(this, props, context));

      _this.renderChildren = function (children) {
        if (typeof children === 'function') {
          return children(_this.state);
        }
        return children;
      };

      _this.onClick = _this.onClick.bind(_this);
      _this.onDocumentDrop = _this.onDocumentDrop.bind(_this);
      _this.onDragStart = _this.onDragStart.bind(_this);
      _this.onDragEnter = _this.onDragEnter.bind(_this);
      _this.onDragLeave = _this.onDragLeave.bind(_this);
      _this.onDragOver = _this.onDragOver.bind(_this);
      _this.onDrop = _this.onDrop.bind(_this);
      _this.onFileDialogCancel = _this.onFileDialogCancel.bind(_this);
      _this.fileAccepted = _this.fileAccepted.bind(_this);
      _this.setRef = _this.setRef.bind(_this);
      _this.isFileDialogActive = false;
      _this.state = {
        isDragActive: false,
        acceptedFiles: [],
        rejectedFiles: []
      };
      return _this;
    }

    (0, _createClass3.default)(Dropzone, [{
      key: 'getDataTransferItems',
      value: function getDataTransferItems(event) {
        var isMultipleAllowed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var dataTransferItemsList = [];
        if (event.dataTransfer) {
          var dt = event.dataTransfer;
          if (dt.files && dt.files.length) {
            dataTransferItemsList = dt.files;
          } else if (dt.items && dt.items.length) {
            // During the drag even the dataTransfer.files is null
            // but Chrome implements some drag store, which is accesible via dataTransfer.items
            dataTransferItemsList = dt.items;
          }
        } else if (event.target && event.target.files) {
          dataTransferItemsList = event.target.files;
        }

        if (dataTransferItemsList.length > 0) {
          dataTransferItemsList = isMultipleAllowed ? dataTransferItemsList : [dataTransferItemsList[0]];
        }

        // Convert from DataTransferItemsList to the native Array
        return Array.prototype.slice.call(dataTransferItemsList);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var preventDropOnDocument = this.props.preventDropOnDocument;

        this.dragTargets = [];

        if (preventDropOnDocument) {
          document.addEventListener('dragover', Dropzone.onDocumentDragOver, false);
          document.addEventListener('drop', this.onDocumentDrop, false);
        }
        // Tried implementing addEventListener, but didn't work out
        document.body.onfocus = this.onFileDialogCancel;
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var preventDropOnDocument = this.props.preventDropOnDocument;

        if (preventDropOnDocument) {
          document.removeEventListener('dragover', Dropzone.onDocumentDragOver);
          document.removeEventListener('drop', this.onDocumentDrop);
        }
        // Can be replaced with removeEventListener, if addEventListener works
        document.body.onfocus = null;
      }
    }, {
      key: 'onDocumentDrop',
      value: function onDocumentDrop(e) {
        if (this.node.contains(e.target)) {
          // if we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
          return;
        }
        e.preventDefault();
        this.dragTargets = [];
      }
    }, {
      key: 'onDragStart',
      value: function onDragStart(e) {
        if (this.props.onDragStart) {
          this.props.onDragStart.call(this, e);
        }
      }
    }, {
      key: 'onDragEnter',
      value: function onDragEnter(e) {
        e.preventDefault();

        // Count the dropzone and any children that are entered.
        if (this.dragTargets.indexOf(e.target) === -1) {
          this.dragTargets.push(e.target);
        }

        var allFilesAccepted = this.allFilesAccepted(this.getDataTransferItems(e, this.props.multiple));

        this.setState({
          isDragActive: allFilesAccepted,
          isDragReject: !allFilesAccepted
        });

        if (this.props.onDragEnter) {
          this.props.onDragEnter.call(this, e);
        }
      }
    }, {
      key: 'onDragOver',
      value: function onDragOver(e) {
        // eslint-disable-line class-methods-use-this
        e.preventDefault();
        e.stopPropagation();
        try {
          e.dataTransfer.dropEffect = 'copy'; // eslint-disable-line no-param-reassign
        } catch (err) {
          // continue regardless of error
        }

        if (this.props.onDragOver) {
          this.props.onDragOver.call(this, e);
        }
        return false;
      }
    }, {
      key: 'onDragLeave',
      value: function onDragLeave(e) {
        var _this2 = this;

        e.preventDefault();

        // Only deactivate once the dropzone and all children have been left.
        this.dragTargets = this.dragTargets.filter(function (el) {
          return el !== e.target && _this2.node.contains(el);
        });
        if (this.dragTargets.length > 0) {
          return;
        }

        this.setState({
          isDragActive: false,
          isDragReject: false
        });

        if (this.props.onDragLeave) {
          this.props.onDragLeave.call(this, e);
        }
      }
    }, {
      key: 'onDrop',
      value: function onDrop(e) {
        var _this3 = this;

        var _props = this.props,
            onDrop = _props.onDrop,
            onDropAccepted = _props.onDropAccepted,
            onDropRejected = _props.onDropRejected,
            multiple = _props.multiple,
            disablePreview = _props.disablePreview;

        var fileList = this.getDataTransferItems(e, multiple);
        var acceptedFiles = [];
        var rejectedFiles = [];

        // Stop default browser behavior
        e.preventDefault();

        // Reset the counter along with the drag on a drop.
        this.dragTargets = [];
        this.isFileDialogActive = false;

        fileList.forEach(function (file) {
          if (!disablePreview) {
            file.preview = window.URL.createObjectURL(file); // eslint-disable-line no-param-reassign
          }

          if (_this3.fileAccepted(file) && _this3.fileMatchSize(file)) {
            acceptedFiles.push(file);
          } else {
            rejectedFiles.push(file);
          }
        });

        if (onDrop) {
          onDrop.call(this, acceptedFiles, rejectedFiles, e);
        }

        if (rejectedFiles.length > 0 && onDropRejected) {
          onDropRejected.call(this, rejectedFiles, e);
        }

        if (acceptedFiles.length > 0 && onDropAccepted) {
          onDropAccepted.call(this, acceptedFiles, e);
        }

        // Reset drag state
        this.setState({
          isDragActive: false,
          isDragReject: false,
          acceptedFiles: acceptedFiles,
          rejectedFiles: rejectedFiles
        });
      }
    }, {
      key: 'onClick',
      value: function onClick(e) {
        var _props2 = this.props,
            onClick = _props2.onClick,
            disableClick = _props2.disableClick;

        if (!disableClick) {
          e.stopPropagation();
          this.open();
          if (onClick) {
            onClick.call(this, e);
          }
        }
      }
    }, {
      key: 'onFileDialogCancel',
      value: function onFileDialogCancel() {
        // timeout will not recognize context of this method
        var onFileDialogCancel = this.props.onFileDialogCancel;
        var fileInputEl = this.fileInputEl;
        var isFileDialogActive = this.isFileDialogActive;
        // execute the timeout only if the onFileDialogCancel is defined and FileDialog
        // is opened in the browser

        if (onFileDialogCancel && isFileDialogActive) {
          setTimeout(function () {
            // Returns an object as FileList
            var FileList = fileInputEl.files;
            if (!FileList.length) {
              isFileDialogActive = false;
              onFileDialogCancel();
            }
          }, 300);
        }
      }
    }, {
      key: 'setRef',
      value: function setRef(ref) {
        this.node = ref;
      }
    }, {
      key: 'fileAccepted',
      value: function fileAccepted(file) {
        // Firefox versions prior to 53 return a bogus MIME type for every file drag, so dragovers with
        // that MIME type will always be accepted
        return file.type === 'application/x-moz-file' || (0, _attrAccept2.default)(file, this.props.accept);
      }
    }, {
      key: 'fileMatchSize',
      value: function fileMatchSize(file) {
        return file.size <= this.props.maxSize && file.size >= this.props.minSize;
      }
    }, {
      key: 'allFilesAccepted',
      value: function allFilesAccepted(files) {
        return files.every(this.fileAccepted);
      }
    }, {
      key: 'open',
      value: function open() {
        this.isFileDialogActive = true;
        this.fileInputEl.value = null;
        this.fileInputEl.click();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;

        var _props3 = this.props,
            accept = _props3.accept,
            activeClassName = _props3.activeClassName,
            inputProps = _props3.inputProps,
            multiple = _props3.multiple,
            name = _props3.name,
            rejectClassName = _props3.rejectClassName,
            children = _props3.children,
            rest = (0, _objectWithoutProperties3.default)(_props3, ['accept', 'activeClassName', 'inputProps', 'multiple', 'name', 'rejectClassName', 'children']);
        var activeStyle = rest.activeStyle,
            className = rest.className,
            rejectStyle = rest.rejectStyle,
            style = rest.style,
            props = (0, _objectWithoutProperties3.default)(rest, ['activeStyle', 'className', 'rejectStyle', 'style']);
        var _state = this.state,
            isDragActive = _state.isDragActive,
            isDragReject = _state.isDragReject;


        className = className || '';

        if (isDragActive && activeClassName) {
          className += ' ' + activeClassName;
        }
        if (isDragReject && rejectClassName) {
          className += ' ' + rejectClassName;
        }

        if (!className && !style && !activeStyle && !rejectStyle) {
          style = {
            width: 200,
            height: 200,
            borderWidth: 2,
            borderColor: '#666',
            borderStyle: 'dashed',
            borderRadius: 5
          };
          activeStyle = {
            borderStyle: 'solid',
            backgroundColor: '#eee'
          };
          rejectStyle = {
            borderStyle: 'solid',
            backgroundColor: '#ffdddd'
          };
        }

        var appliedStyle = void 0;
        if (activeStyle && isDragActive) {
          appliedStyle = (0, _extends3.default)({}, style, activeStyle);
        } else if (rejectStyle && isDragReject) {
          appliedStyle = (0, _extends3.default)({}, style, rejectStyle);
        } else {
          appliedStyle = (0, _extends3.default)({}, style);
        }

        var inputAttributes = {
          accept: accept,
          type: 'file',
          style: { display: 'none' },
          multiple: supportMultiple && multiple,
          ref: function ref(el) {
            return _this4.fileInputEl = el;
          }, // eslint-disable-line
          onChange: this.onDrop
        };

        if (name && name.length) {
          inputAttributes.name = name;
        }

        // Remove custom properties before passing them to the wrapper div element
        var customProps = ['acceptedFiles', 'preventDropOnDocument', 'disablePreview', 'disableClick', 'onDropAccepted', 'onDropRejected', 'onFileDialogCancel', 'maxSize', 'minSize'];
        var divProps = (0, _extends3.default)({}, props);
        customProps.forEach(function (prop) {
          return delete divProps[prop];
        });

        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({
            className: className,
            style: appliedStyle
          }, divProps /* expand user provided props first so event handlers are never overridden */, {
            onClick: this.onClick,
            onDragStart: this.onDragStart,
            onDragEnter: this.onDragEnter,
            onDragOver: this.onDragOver,
            onDragLeave: this.onDragLeave,
            onDrop: this.onDrop,
            ref: this.setRef,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 352
            },
            __self: this
          }),
          this.renderChildren(children),
          _react2.default.createElement('input', (0, _extends3.default)({}, inputProps /* expand user provided inputProps first so inputAttributes override them */, inputAttributes, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 365
            },
            __self: this
          }))
        );
      }
    }]);
    return Dropzone;
  }(_react2.default.Component);

  Dropzone.defaultProps = {
    preventDropOnDocument: true,
    disablePreview: false,
    disableClick: false,
    multiple: true,
    maxSize: Infinity,
    minSize: 0
  };

  Dropzone.propTypes = {
    onClick: _react2.default.PropTypes.func,
    onDrop: _react2.default.PropTypes.func,
    onDropAccepted: _react2.default.PropTypes.func,
    onDropRejected: _react2.default.PropTypes.func,
    onDragStart: _react2.default.PropTypes.func,
    onDragEnter: _react2.default.PropTypes.func,
    onDragOver: _react2.default.PropTypes.func,
    onDragLeave: _react2.default.PropTypes.func,

    children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.node, _react2.default.PropTypes.func]), // Contents of the dropzone
    style: _react2.default.PropTypes.object, // CSS styles to apply
    activeStyle: _react2.default.PropTypes.object, // CSS styles to apply when drop will be accepted
    rejectStyle: _react2.default.PropTypes.object, // CSS styles to apply when drop will be rejected
    className: _react2.default.PropTypes.string, // Optional className
    activeClassName: _react2.default.PropTypes.string, // className for accepted state
    rejectClassName: _react2.default.PropTypes.string, // className for rejected state

    preventDropOnDocument: _react2.default.PropTypes.bool, // If false, allow dropped items to take over the current browser window
    disablePreview: _react2.default.PropTypes.bool, // Enable/disable preview generation
    disableClick: _react2.default.PropTypes.bool, // Disallow clicking on the dropzone container to open file dialog
    onFileDialogCancel: _react2.default.PropTypes.func, // Provide a callback on clicking the cancel button of the file dialog

    inputProps: _react2.default.PropTypes.object, // Pass additional attributes to the <input type="file"/> tag
    multiple: _react2.default.PropTypes.bool, // Allow dropping multiple files
    accept: _react2.default.PropTypes.string, // Allow specific types of files. See https://github.com/okonet/attr-accept for more information
    name: _react2.default.PropTypes.string, // name attribute for the input tag
    maxSize: _react2.default.PropTypes.number,
    minSize: _react2.default.PropTypes.number
  };

    exports.default = Dropzone;

/***/ },
/* 65 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 66 */
/***/ function(module, exports) {

  module.exports = require("attr-accept");

/***/ },
/* 67 */
/***/ function(module, exports) {

  module.exports = require("xlsx-style");

/***/ },
/* 68 */
/***/ function(module, exports) {

  module.exports = require("file-saver");

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _jsxFileName = '/Users/naver/workspace/excel-merge-tool/src/routes/notFound/index.js'; /**
                                                                                              * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                              *
                                                                                              * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                              *
                                                                                              * This source code is licensed under the MIT license found in the
                                                                                              * LICENSE.txt file in the root directory of this source tree.
                                                                                              */

  var _react = __webpack_require__(14);

  var _react2 = _interopRequireDefault(_react);

  var _NotFound = __webpack_require__(70);

  var _NotFound2 = _interopRequireDefault(_NotFound);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var title = 'Page Not Found';

  exports.default = {

    path: '*',

    action: function action() {
      return {
        title: title,
        component: _react2.default.createElement(
          'div',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 22
            },
            __self: this
          },
          _react2.default.createElement(_NotFound2.default, { title: title, __source: {
              fileName: _jsxFileName,
              lineNumber: 22
            },
            __self: this
          })
        ),
        status: 404
      };
    }
    };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getPrototypeOf = __webpack_require__(20);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck2 = __webpack_require__(21);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass2 = __webpack_require__(22);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn2 = __webpack_require__(23);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits2 = __webpack_require__(24);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _jsxFileName = '/Users/naver/workspace/excel-merge-tool/src/routes/notFound/NotFound.js'; /**
                                                                                                 * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                 *
                                                                                                 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                 *
                                                                                                 * This source code is licensed under the MIT license found in the
                                                                                                 * LICENSE.txt file in the root directory of this source tree.
                                                                                                 */

  var _react = __webpack_require__(14);

  var _react2 = _interopRequireDefault(_react);

  var _withStyles = __webpack_require__(28);

  var _withStyles2 = _interopRequireDefault(_withStyles);

  var _NotFound = __webpack_require__(71);

  var _NotFound2 = _interopRequireDefault(_NotFound);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var NotFound = function (_React$Component) {
    (0, _inherits3.default)(NotFound, _React$Component);

    function NotFound() {
      (0, _classCallCheck3.default)(this, NotFound);
      return (0, _possibleConstructorReturn3.default)(this, (NotFound.__proto__ || (0, _getPrototypeOf2.default)(NotFound)).apply(this, arguments));
    }

    (0, _createClass3.default)(NotFound, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: _NotFound2.default.root, __source: {
              fileName: _jsxFileName,
              lineNumber: 21
            },
            __self: this
          },
          _react2.default.createElement(
            'div',
            { className: _NotFound2.default.container, __source: {
                fileName: _jsxFileName,
                lineNumber: 22
              },
              __self: this
            },
            _react2.default.createElement(
              'h1',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 23
                },
                __self: this
              },
              this.props.title
            ),
            _react2.default.createElement(
              'p',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 24
                },
                __self: this
              },
              'Sorry, the page you were trying to view does not exist.'
            )
          )
        );
      }
    }]);
    return NotFound;
  }(_react2.default.Component);

  NotFound.propTypes = {
    title: _react.PropTypes.string.isRequired
  };
    exports.default = (0, _withStyles2.default)(_NotFound2.default)(NotFound);

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(72);
      var insertCss = __webpack_require__(32);

      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }

      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]-[local]-[hash:base64:5]\",\"minimize\":false,\"discardComments\":{\"removeAll\":true}}!../../../node_modules/postcss-loader/index.js?pack=default!./NotFound.css", function() {
          content = require("!!../../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]-[local]-[hash:base64:5]\",\"minimize\":false,\"discardComments\":{\"removeAll\":true}}!../../../node_modules/postcss-loader/index.js?pack=default!./NotFound.css");

          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }

          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports


  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {/*\n   * Typography\n   * ======================================================================== *//*\n   * Layout\n   * ======================================================================== *//*\n   * Media queries breakpoints\n   * ======================================================================== *//* Extra small screen / phone *//* Small screen / tablet *//* Medium screen / desktop *//* Large screen / wide desktop */\n}\n\n.NotFound-root-3whbd {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.NotFound-container-1BOHG {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/Users/naver/workspace/excel-merge-tool/src/routes/notFound/NotFound.css","/Users/naver/workspace/excel-merge-tool/src/components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;;;;;;GAOG;;AAEH,OACE;;gFAE8E;;gFAMA;;gFAMA,gCAErB,2BACL,6BACE,iCACI;CAC3D;;ADnBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;CACrC","file":"NotFound.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":""}]);

  // exports
  exports.locals = {
  	"root": "NotFound-root-3whbd",
  	"container": "NotFound-container-1BOHG"
  };

/***/ },
/* 73 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = configureStore;

  var _redux = __webpack_require__(57);

  var _reduxThunk = __webpack_require__(75);

  var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

  var _reducers = __webpack_require__(76);

  var _reducers2 = _interopRequireDefault(_reducers);

  var _createHelpers = __webpack_require__(77);

  var _createHelpers2 = _interopRequireDefault(_createHelpers);

  var _logger = __webpack_require__(80);

  var _logger2 = _interopRequireDefault(_logger);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function configureStore(initialState, helpersConfig) {
    var helpers = (0, _createHelpers2.default)(helpersConfig);
    var middleware = [_reduxThunk2.default.withExtraArgument(helpers)];

    var enhancer = void 0;

    if (true) {
      middleware.push((0, _logger2.default)());

      // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
      var devToolsExtension = function devToolsExtension(f) {
        return f;
      };
      if (false) {
        devToolsExtension = window.devToolsExtension();
      }

      enhancer = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware), devToolsExtension);
    } else {
      enhancer = _redux.applyMiddleware.apply(undefined, middleware);
    }

    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    var store = (0, _redux.createStore)(_reducers2.default, initialState, enhancer);

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (false) {
      module.hot.accept('../reducers', function () {
        return (
          // eslint-disable-next-line global-require
          store.replaceReducer(require('../reducers').default)
        );
      });
    }

    return store;
  }

/***/ },
/* 75 */
/***/ function(module, exports) {

  module.exports = require("redux-thunk");

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _toConsumableArray2 = __webpack_require__(2);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _redux = __webpack_require__(57);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function todos() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
      case 'ADD_TODO':
        return [].concat((0, _toConsumableArray3.default)(state), [{ text: action.text }]);
      case 'DELETE_TODO':
        return [].concat((0, _toConsumableArray3.default)(state.slice(0, action.index)), (0, _toConsumableArray3.default)(state.slice(action.index + 1)));
      case 'RECEIVE_TODOS':
        return action.todos;
      default:
        return state;
    }
  }

  function adding() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments[1];

    switch (action.type) {
      case 'SHOW_EDITOR':
        return true;
      case 'HIDE_EDITOR':
        return false;
      default:
        return state;
    }
  }

  var rootReducer = (0, _redux.combineReducers)({
    todos: todos,
    adding: adding
  });

    exports.default = rootReducer;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends2 = __webpack_require__(3);

  var _extends3 = _interopRequireDefault(_extends2);

  var _regenerator = __webpack_require__(1);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _stringify = __webpack_require__(33);

  var _stringify2 = _interopRequireDefault(_stringify);

  var _asyncToGenerator2 = __webpack_require__(5);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  exports.default = createHelpers;

  var _fetch = __webpack_require__(78);

  var _fetch2 = _interopRequireDefault(_fetch);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function createGraphqlRequest(fetchKnowingCookie) {
    return function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(query, variables) {
        var fetchConfig, resp;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetchConfig = {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: (0, _stringify2.default)({ query: query, variables: variables }),
                  credentials: 'include'
                };
                _context.next = 3;
                return fetchKnowingCookie('/graphql', fetchConfig);

              case 3:
                resp = _context.sent;

                if (!(resp.status !== 200)) {
                  _context.next = 6;
                  break;
                }

                throw new Error(resp.statusText);

              case 6:
                _context.next = 8;
                return resp.json();

              case 8:
                return _context.abrupt('return', _context.sent);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function graphqlRequest(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return graphqlRequest;
    }();
  }

  function createFetchKnowingCookie(_ref2) {
    var cookie = _ref2.cookie;

    if (true) {
      return function (url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var isLocalUrl = /^\/($|[^/])/.test(url);

        // pass cookie only for itself.
        // We can't know cookies for other sites BTW
        if (isLocalUrl && options.credentials === 'include') {
          var headers = (0, _extends3.default)({}, options.headers, {
            cookie: cookie
          });
          return (0, _fetch2.default)(url, (0, _extends3.default)({}, options, { headers: headers }));
        }

        return (0, _fetch2.default)(url, options);
      };
    }

    return _fetch2.default;
  }

  function createHelpers(config) {
    var fetchKnowingCookie = createFetchKnowingCookie(config);
    var graphqlRequest = createGraphqlRequest(fetchKnowingCookie);

    return {
      fetch: fetchKnowingCookie,
      graphqlRequest: graphqlRequest,
      history: config.history
    };
    }

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;

  var _bluebird = __webpack_require__(51);

  var _bluebird2 = _interopRequireDefault(_bluebird);

  var _nodeFetch = __webpack_require__(79);

  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

  var _config = __webpack_require__(42);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  _nodeFetch2.default.Promise = _bluebird2.default; /**
                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                     *
                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                     *
                                                     * This source code is licensed under the MIT license found in the
                                                     * LICENSE.txt file in the root directory of this source tree.
                                                     */

  _nodeFetch.Response.Promise = _bluebird2.default;

  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }

    if (url.startsWith('http')) {
      return url;
    }

    return 'http://' + _config.host + url;
  }

  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }

  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
    exports.Response = _nodeFetch.Response;

/***/ },
/* 79 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createLogger;

  var _util = __webpack_require__(81);

  // Server side redux action logger
  function createLogger() {
    return function (store) {
      return function (next) {
        return function (action) {
          // eslint-disable-line no-unused-vars
          var formattedPayload = (0, _util.inspect)(action.payload, {
            colors: true
          });
          console.log(' * ' + action.type + ': ' + formattedPayload); // eslint-disable-line no-console
          return next(action);
        };
      };
    };
    }

/***/ },
/* 81 */
/***/ function(module, exports) {

  module.exports = require("util");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map