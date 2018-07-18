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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/animation/animation.js":
/*!************************************!*\
  !*** ./app/animation/animation.js ***!
  \************************************/
/*! exports provided: RobotAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RobotAnimation", function() { return RobotAnimation; });
function RobotAnimation({
    robotBody,
    openEyeEndpoint,
    rightEyeOpenAnimation,
    leftEyeOpenAnimation,
    rightEyeCloseAnimation,
    leftEyeCloseAnimation,
    eyesGroup,
    pupilsGroup,
    leftEye,
    rightEye,
    leftWheel,
    rightWheel
} = config, isSleeping) {
    this.robotBody = robotBody;
    this.openEyeEndpoint = openEyeEndpoint;
    this.rightEyeOpenAnimation = rightEyeOpenAnimation;
    this.leftEyeOpenAnimation = leftEyeOpenAnimation;
    this.rightEyeCloseAnimation = rightEyeCloseAnimation;
    this.leftEyeCloseAnimation = leftEyeCloseAnimation;
    this.eyesGroup = eyesGroup;
    this.pupilsGroup = pupilsGroup;
    this.leftEye = leftEye;
    this.rightEye = rightEye;
    this.leftWheel = leftWheel;
    this.rightWheel = rightWheel;

    this.isSleeping = isSleeping;

    this.timers = {};

    this.eyeBlinking = this.eyeBlinking.bind(this);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);

    this.timers = {};
}

RobotAnimation.prototype = {
    checkSleeping: function (isSleeping) {
        isSleeping ? this.robotBody.classList.add('sleeping') : this.robotBody.classList.remove('sleeping');
    },

    handleAnimationEnd: function (resolve, subscriber, callback) {
        subscriber.removeEventListener('animationend', callback);
        resolve();
    },

    flinch: function () {
        var _this = this;
        _this.isSleeping = false;
        _this.checkSleeping();

        return new Promise(function (resolve, reject) {
            _this.robotBody.addEventListener('animationend', _this.handleAnimationEnd.bind(_this, resolve, _this.robotBody, _this.handleAnimationEnd));
            _this.robotBody.classList.add('awakening');
        })
    },

    awakening: function () {
        var _this = this;
        _this.isSleeping = false;
        _this.checkSleeping();

        return new Promise(function (resolve, reject) {
            _this.rightEyeOpenAnimation.beginElement();
            _this.leftEyeOpenAnimation.beginElement();
            _this.pupilsGroup.classList.add('open');

            var openEyesTime = Number(_this.rightEyeOpenAnimation.attributes.dur.value.slice(0, -1)) * 1000 + 1000; // convert "0.2s" into 200 and increase it on 1000 ms for delay

            _this.timers.openEyes = window.setTimeout(function () {
                _this.lookingAround()
                    .then(function () {
                        _this.eyeBlinking(resolve);
                    });

                window.clearTimeout(_this.timers.openEyes);
                _this.robotBody.classList.remove('awakening');

            }, openEyesTime);
        })

    },

    lookingAround: function () {
        var _this = this;

        return new Promise(function (resolve, reject) {
            _this.pupilsGroup.addEventListener('animationend', _this.handleAnimationEnd.bind(_this, resolve, _this.pupilsGroup, _this.handleAnimationEnd));
            _this.pupilsGroup.classList.add('looking-around');
        })
    },

    eyeBlinking: function (resolve) {
        this.pupilsGroup.classList.remove('looking-around');
        this.rightEyeCloseAnimation.beginElement();
        this.leftEyeCloseAnimation.beginElement();
        this.pupilsGroup.classList.remove('open');

        this.timers.eyeBlinking = window.setTimeout(() => {
            this.rightEyeOpenAnimation.beginElement();
            this.leftEyeOpenAnimation.beginElement();
            this.pupilsGroup.classList.add('open');
            if (resolve) {
                resolve();
            }
            window.clearTimeout(this.timers.eyeBlinking);
        }, 300);

        this.pupilsGroup.removeEventListener('animationend', this.eyeBlinking);
    },

    moving: function () {
        var _this = this;

        return {
            forward: function () {
                _this.leftWheel.classList.remove('left-wheel-rotate-back');
                _this.rightWheel.classList.remove('right-wheel-rotate-back');
                _this.leftWheel.classList.add('left-wheel-rotate-forward');
                _this.rightWheel.classList.add('right-wheel-rotate-forward');
            },
            back: function () {
                _this.leftWheel.classList.remove('left-wheel-rotate-forward');
                _this.rightWheel.classList.remove('right-wheel-rotate-forward');
                _this.leftWheel.classList.add('left-wheel-rotate-back');
                _this.rightWheel.classList.add('right-wheel-rotate-back');
            }
        }
        // this.robotBody.classList.add('moving');
    },

    stopMoving: function () {
        this.leftWheel.classList.remove('left-wheel-rotate-forward');
        this.rightWheel.classList.remove('right-wheel-rotate-forward');
        this.leftWheel.classList.remove('left-wheel-rotate-back');
        this.rightWheel.classList.remove('right-wheel-rotate-back');
    }
}


/***/ }),

/***/ "./app/config/robotA.js":
/*!******************************!*\
  !*** ./app/config/robotA.js ***!
  \******************************/
/*! exports provided: getRobotAConfig, getRobotAAreaConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRobotAConfig", function() { return getRobotAConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRobotAAreaConfig", function() { return getRobotAAreaConfig; });
function getRobotAConfig() {
    var robotAModel = document.querySelector('#robotA-svg');
    var robot = document.querySelector('#robotA');
    var robotBody = robot.querySelector('#robotA-body');
    var rightEyeOpenAnimation = robot.querySelector('#right-eye-open-animation');
    var leftEyeOpenAnimation = robot.querySelector('#left-eye-open-animation');
    var rightEyeCloseAnimation = robot.querySelector('#right-eye-close-animation');
    var leftEyeCloseAnimation = robot.querySelector('#left-eye-close-animation');
    var eyesGroup = robot.querySelector('#eyes-group');
    var pupilsGroup = eyesGroup.querySelector('#pupils-group');
    var leftEye = eyesGroup.querySelector('#left-eye');
    var rightEye = eyesGroup.querySelector('#right-eye');
    var leftWheel = robot.querySelector('#left-wheel');
    var rightWheel = robot.querySelector('#right-wheel');

    var robotAHeight = robotAModel.getBoundingClientRect().height;
    var robotAWidth = robotAModel.getBoundingClientRect().width;

    var posX = robotAModel.getBoundingClientRect().x;
    var posY = robotAModel.getBoundingClientRect().y;

    return {
        robot: {
            svg: robotAModel,
            element: robot,
            posX,
            posY,
            robotHeight: robotAHeight,
            robotWidth: robotAWidth,
            speedX: 1.1,
            accelX: 0.2,
        },
        animatedElements: {
            robotBody,
            rightEyeOpenAnimation,
            leftEyeOpenAnimation,
            rightEyeCloseAnimation,
            leftEyeCloseAnimation,
            eyesGroup,
            pupilsGroup,
            leftEye,
            rightEye,
            leftWheel,
            rightWheel
        }
    }
};

function getRobotAAreaConfig() {
    var robotAArea = document.querySelector('#robotA-area');
    var areaWidth = robotAArea.offsetWidth;
    var areaHeight = robotAArea.offsetHeight;

    return {
        height: areaHeight,
        width: areaWidth
    }
}


/***/ }),

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _robot_robot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./robot/robot */ "./app/robot/robot.js");
/* harmony import */ var _config_robotA__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/robotA */ "./app/config/robotA.js");



document.addEventListener('DOMContentLoaded', function () {
    var startAButton = document.querySelector('#robotA-go-button');
    var stopAButton = document.querySelector('#robotA-stop-button');

    var startBButton = document.querySelector('#robotB-go-button');
    var stopBButton = document.querySelector('#robotB-stop-button');

    var robotAConfig = Object(_config_robotA__WEBPACK_IMPORTED_MODULE_1__["getRobotAConfig"])();
    var robotAArea = Object(_config_robotA__WEBPACK_IMPORTED_MODULE_1__["getRobotAAreaConfig"])();
    var robotA = new _robot_robot__WEBPACK_IMPORTED_MODULE_0__["HorizontalRobot"](robotAConfig, robotAArea);

    var robotBConfig = Object(_config_robotA__WEBPACK_IMPORTED_MODULE_1__["getRobotAConfig"])();
    var robotBArea = Object(_config_robotA__WEBPACK_IMPORTED_MODULE_1__["getRobotAAreaConfig"])();
    var robotB = new _robot_robot__WEBPACK_IMPORTED_MODULE_0__["HorizontalRobot"](robotBConfig, robotBArea);

    startAButton.addEventListener('click', function (event) {
        robotA.go();
    });

    stopAButton.addEventListener('click', function (event) {
        robotA.stop();
    });

    startBButton.addEventListener('click', function (event) {
        robotB.go();
    });

    stopBButton.addEventListener('click', function (event) {
        robotB.stop();
    });
});



/* var BallH =
{
    PosX: 0,
    PosY: 10,
    SpeedY: 0,
    AccelY: 0.2,
    Width: 100,
    Height: 100,

    Update: function () {
        var BallObj = document.getElementById('IBall');
        BallObj.style.transform = "translateX(" + this.PosX + "px) translateY(" + this.PosY + "px) translateZ(0)";
    }
}

var AreaH =
{
    Width: 400,
    Height: 300
}

function Start() {
    requestAnimationFrame(Tick);
}

function Tick() {
    BallH.SpeedY += BallH.AccelY;
    BallH.PosY += BallH.SpeedY;
    // вылетел ли мяч ниже пола?
    if (BallH.PosY + BallH.Height > AreaH.Height) {
        BallH.SpeedY = -BallH.SpeedY;
        BallH.PosY = AreaH.Height - BallH.Height;
    }

    BallH.Update();

    requestAnimationFrame(Tick);
}

BallH.Update();
 */


/***/ }),

/***/ "./app/robot/robot.js":
/*!****************************!*\
  !*** ./app/robot/robot.js ***!
  \****************************/
/*! exports provided: HorizontalRobot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HorizontalRobot", function() { return HorizontalRobot; });
/* harmony import */ var _animation_animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation/animation */ "./app/animation/animation.js");


function HorizontalRobot({ robot, animatedElements } = config, area) {
    this.robot = robot;
    this.isSleeping = true;
    this.robotAnimation = new _animation_animation__WEBPACK_IMPORTED_MODULE_0__["RobotAnimation"](animatedElements, this.isSleeping);
    this.robotAnimation.checkSleeping(this.isSleeping);
    this.area = area;
    this.step = this.step.bind(this);
    this.update = this.update.bind(this);

    this.frames = {};
}

HorizontalRobot.prototype = {
    go: function () {
        var _this = this;

        if (this.isSleeping) {
            this.isSleeping = false;
            this.robotAnimation.flinch()
                .then(function () {
                    _this.robotAnimation.awakening()
                        .then(function () {
                            _this.robot.speedX > 0 ? _this.robotAnimation.moving().forward() : _this.robotAnimation.moving().back();
                            _this.frames.robotA = window.requestAnimationFrame(_this.step);
                        })
                })

            // this.robotBody.classList.add('awakening');
        } else {
            _this.robot.speedX > 0 ? _this.robotAnimation.moving().forward() : _this.robotAnimation.moving().back();
            _this.frames.robotA = window.requestAnimationFrame(_this.step);
        }
    },

    update: function () {
        this.robot.svg.style.transform = "translateX(" + this.robot.posX + "px) translateY(0) translateZ(0)";
    },

    step() {
        this.robot.posX += this.robot.speedX;
        // вылетел ли мяч правее стены?
        if (this.robot.posX + this.robot.robotWidth > this.area.width) {
            this.robot.speedX = -this.robot.speedX;
            this.robot.posX = this.area.width - this.robot.robotWidth;
            this.robotAnimation.moving().back();
        }
        // вылетел ли мяч левее стены?
        if (this.robot.posX < 0) {
            this.robot.speedX = -this.robot.speedX;
            this.robot.posX = 0;
            this.robotAnimation.moving().forward();
        }

        this.update();

        this.frames.robotA = window.requestAnimationFrame(this.step);
    },

    stop: function () {
        this.robotAnimation.stopMoving();
        window.cancelAnimationFrame(this.frames.robotA);
    }
}


/***/ }),

/***/ "./styles/index.scss":
/*!***************************!*\
  !*** ./styles/index.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!************************************************!*\
  !*** multi ./app/index.js ./styles/index.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./app/index.js */"./app/index.js");
module.exports = __webpack_require__(/*! ./styles/index.scss */"./styles/index.scss");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map