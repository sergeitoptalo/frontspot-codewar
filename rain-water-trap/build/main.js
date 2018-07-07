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

var _controls = __webpack_require__(3);

var _controls2 = _interopRequireDefault(_controls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
    var runButton = document.querySelector('#run-button');

    var container = document.querySelector('#container');
    var controls = void 0;

    var detectClickTarget = function detectClickTarget(event) {
        controls.detectClickTarget(event);
    };

    runButton.addEventListener('click', function () {
        var initialColumnsNumber = document.querySelector('#columns-number').value;
        var wall = new _wall2.default(initialColumnsNumber, container);
        if (controls) {
            controls.getControlsContainer().removeEventListener('click', detectClickTarget);
        }
        controls = new _controls2.default(wall, initialColumnsNumber);
        controls.getControlsContainer().addEventListener('click', detectClickTarget);
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*   
Wall config: 
       -1 - water;
        0 - space;
        1 - stone;
*/

var Wall = function () {
    function Wall(columnsNumber, container) {
        _classCallCheck(this, Wall);

        this.state = [];
        this.row = [];
        this.columnsNumber = columnsNumber;
        this.container = container;
        this.addNewRow();
        this.render();
    }

    _createClass(Wall, [{
        key: 'rain',
        value: function rain() {
            this.state.wasRain = true;
            this.state.forEach(function (row, rowIndex, rowArray) {
                var firstStoneIndex = row.indexOf(1);
                var lastStoneIndex = row.lastIndexOf(1);

                for (var i = firstStoneIndex; i < lastStoneIndex; i++) {
                    if (row[i] === 0) {
                        row[i] = -1;
                    }
                }
            });

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
                if (row[columnIndex] === 1 && index === array.length - 1) {
                    _this.addNewRow(columnIndex);
                }
                if (row[columnIndex] <= 0 && !wallBorder) {
                    row[columnIndex] = 1;
                    wallBorder = 1;
                }
            });

            this.render();
        }
    }, {
        key: 'removeStone',
        value: function removeStone(columnIndex) {
            var column = this.state.map(function (row) {
                return row[columnIndex];
            });

            var lastStoneIndex = column.lastIndexOf(1);

            if (lastStoneIndex !== -1) {
                this.state[lastStoneIndex][columnIndex] = 0;

                if (this.state[lastStoneIndex].some(function (cell) {
                    return cell === -1;
                })) {
                    this.state[lastStoneIndex].forEach(function (cell, cellIndex, cellsArray) {
                        if (cell === -1) {
                            cellsArray[cellIndex] = 0;
                        }
                    });

                    this.rain();
                } else {
                    this.render();
                };
            }
        }
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
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controls = function () {
    function Controls(wall, columnsNumber) {
        _classCallCheck(this, Controls);

        this.wall = wall;
        this.columnsNumber = columnsNumber;
        this.controlsContainer = document.querySelector('#controls-container');

        this.render();
    }

    _createClass(Controls, [{
        key: 'getControlsContainer',
        value: function getControlsContainer() {
            return this.controlsContainer;
        }
    }, {
        key: 'detectClickTarget',
        value: function detectClickTarget(event) {
            var target = event.target;
            if (target.dataset) {
                var action = target.dataset.action;
                switch (action) {
                    case 'increase':
                        {
                            this.wall.addStone(target.parentNode.dataset.column);
                            break;
                        };
                    case 'reduce':
                        {
                            this.wall.removeStone(target.parentNode.dataset.column);
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
                controlsMarkup += '\n        <td data-column="' + i + '">\n            <button data-action="increase">&#9650;</button>\n            <button data-action="reduce">&#9660;</button>\n        </td>';
            }

            this.controlsContainer.innerHTML = '\n        <button data-action="run-rain" class="rain-button">Rain</button>\n        <table class="controls-table">\n            <tr>\n                ' + controlsMarkup + '\n            </tr>\n        </table>\n        \n    ';
        }
    }]);

    return Controls;
}();

exports.default = Controls;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map