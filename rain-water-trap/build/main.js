/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _wall = __webpack_require__(1);

var _wall2 = _interopRequireDefault(_wall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
    //const elevationMap = [1, 0, 2, 3, 5, 6, 8, 7, 6, 0, 0, 0];

    var runButton = document.querySelector('#run-button');

    //runButton.addEventListener();

    var container = document.querySelector('#container');

    runButton.addEventListener('click', function () {
        var initialColumnsNumber = document.querySelector('#columns-number').value;
        new _wall2.default(initialColumnsNumber, container);
    });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controls = __webpack_require__(2);

var _controls2 = _interopRequireDefault(_controls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wall = function () {
    function Wall(columnsNumber, container) {
        _classCallCheck(this, Wall);

        this.state = [];
        // this.emptyRow = [];
        this.row = [];
        this.columnsNumber = columnsNumber;
        this.container = container;
        this.controls = new _controls2.default(this, columnsNumber).render();
        this.addNewRow();
        this.render();
    }

    _createClass(Wall, [{
        key: 'rain',
        value: function rain() {
            this.state.forEach(function (row, rowIndex, rowArray) {
                var firstStoneIndex = null;
                var lastStoneIndex = null;

                row.forEach(function (element, index, array) {
                    if (index !== 0 || index !== array.length - 1) {
                        if (array[index - 1] === 1 && array[index + 1] === 1) {
                            array[index] = -1;
                        }
                    }
                });
            });
            /*         let waterConfig = [];
                    let rowFirstStoneIndex = null;
                    let rowLastStoneIndex = null;
                    this.state.forEach((row, index) => {
                        waterConfig.push([]);
                        row.forEach((element, elIndex) => {
                            if (element === 1 && rowFirstStoneIndex === null) {
                                rowFirstStoneIndex = elIndex;
                            }
                            if (element === 1 && rowFirstStoneIndex !== null && elIndex !== rowFirstStoneIndex) {
                                rowLastStoneIndex = elIndex;
                                for (let i = rowLastStoneIndex - 1; i > rowFirstStoneIndex; i--) {
                                    waterConfig[index].push(i);
                                }
                                rowFirstStoneIndex = rowLastStoneIndex;
                                rowLastStoneIndex = null;
                            }
                        })
                        if (!waterConfig[index]) {
                            waterConfig[index] = null;
                        }
                        rowFirstStoneIndex = null;
                        rowLastStoneIndex = null;
                    })
            
                    waterConfig.forEach((row, index) => {
                        if (row) {
                            row.forEach(element => {
                                this.state[index][element] = 2;
                            })
                        }
                    }) */

            this.render();
        }
    }, {
        key: 'addNewRow',
        value: function addNewRow(stoneIndex) {
            this.row.splice(0, this.row.length);
            for (var i = 0; i < this.columnsNumber; i++) {
                this.row.push(0);
            }

            if (stoneIndex) {
                this.row[stoneIndex] = 1;
            }

            this.state.push([].concat(_toConsumableArray(this.row)));
        }
    }, {
        key: 'addStone',
        value: function addStone(columnIndex) {
            var _this = this;

            var wallBorder = 0;
            this.state.forEach(function (row, index, array) {
                if (row[columnIndex] && index === array.length - 1) {
                    _this.addNewRow(columnIndex);
                }
                if (!row[columnIndex] && !wallBorder) {
                    row[columnIndex] = 1;
                    wallBorder = 1;
                }
            });

            this.render();
        }
    }, {
        key: 'removeStone',
        value: function removeStone(columnIndex) {}
    }, {
        key: 'render',
        value: function render() {
            container.innerHTML = '\n        <table>\n        ' + this.state.map(function (row) {
                return '<tr>\n                    ' + row.map(function (element) {
                    return '<td ' + (element !== 0 ? 'class="' + (element === 1 ? 'wall' : 'water') + '"' : '') + '></td>';
                }).join('') + '\n                </tr>';
            }).reverse().join('') + '\n        </table>\n      ';
        }
    }]);

    return Wall;
}();

exports.default = Wall;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controls = function () {
    function Controls(wall, columnsNumber) {
        var _this = this;

        _classCallCheck(this, Controls);

        this.wall = wall;
        this.columnsNumber = columnsNumber;
        this.controlsContainer = document.querySelector('#controls-container');
        this.controlsContainer.addEventListener('click', function (event) {
            return _this.detectClickTarget(event);
        });
    }

    _createClass(Controls, [{
        key: 'detectClickTarget',
        value: function detectClickTarget(event) {
            var target = event.target;
            if (target.dataset) {
                var action = target.dataset.action;
                switch (action) {
                    case 'increase':
                        {
                            //target.parentNode.dataset.wallLevel++;
                            this.wall.addStone(target.parentNode.dataset.column);

                            break;
                        };

                    case 'reduce':
                        {
                            this.wall.removeStone(target.dataset.column);
                            break;
                        };

                    case 'run-rain':
                        {
                            this.wall.rain();
                            break;
                        }
                    default:
                        break;
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var controlsMarkup = '';
            for (var i = 0; i < this.columnsNumber; i++) {
                controlsMarkup += '\n        <td data-column="' + i + '">\n            <button data-action="increase">+</button>\n            <button data-action="reduce">-</button>\n        </td>';
            }

            this.controlsContainer.innerHTML = '\n        <table>\n            <tr>\n                ' + controlsMarkup + '\n            </tr>\n        </table>\n        <button data-action="run-rain">Rain</button>\n    ';
        }
    }]);

    return Controls;
}();

exports.default = Controls;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map