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

/***/ "./app/animation/AnimatedRobot.js":
/*!****************************************!*\
  !*** ./app/animation/AnimatedRobot.js ***!
  \****************************************/
/*! exports provided: AnimatedRobot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimatedRobot", function() { return AnimatedRobot; });
/* harmony import */ var _Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Animation */ "./app/animation/Animation.js");


function AnimatedRobot(Robot, config) {
    this.robot = new Robot(config);
    this.animation = new _Animation__WEBPACK_IMPORTED_MODULE_0__["Animation"](config);
    this.animatedElements = config.animatedElements;
    this.isSleeping = true;

    this.animatedElements.robotBody.classList.add('sleeping');

    this.handleDirectionChange = this.handleDirectionChange.bind(this);
}

AnimatedRobot.prototype = {
    handleDirectionChange: function(direction) {
        this.animation.changeWheelDirection()[direction]();
    },

    moveHorizontally: function () {
        if (this.isSleeping) {
            this.animation.flinch()
                .then(() => {
                    this.animation.awakening()
                        .then(() => {
                            this.isSleeping = false;
                            this.robot.moveHorizontally(this.handleDirectionChange);
                        })
                })
        } else {
            this.robot.moveHorizontally(this.handleDirectionChange);
        }
    },

    moveVertically: function () {
        if (this.isSleeping) {
            this.animation.flinch()
                .then(() => {
                    this.animation.awakening()
                        .then(() => {
                            this.isSleeping = false;
                            this.robot.moveVertically(this.handleDirectionChange);
                        })
                })
        } else {
            this.robot.moveVertically(this.handleDirectionChange);
        }
    },

    stop: function () {
        this.robot.stop();
        this.animation.stopMoving();
    }
}


/***/ }),

/***/ "./app/animation/Animation.js":
/*!************************************!*\
  !*** ./app/animation/Animation.js ***!
  \************************************/
/*! exports provided: Animation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });
function Animation({ animatedElements } = config) {
    this.robotBody = animatedElements.robotBody;
    this.openEyeEndpoint = animatedElements.openEyeEndpoint;
    this.rightEyeOpenAnimation = animatedElements.rightEyeOpenAnimation;
    this.leftEyeOpenAnimation = animatedElements.leftEyeOpenAnimation;
    this.rightEyeCloseAnimation = animatedElements.rightEyeCloseAnimation;
    this.leftEyeCloseAnimation = animatedElements.leftEyeCloseAnimation;
    this.eyesGroup = animatedElements.eyesGroup;
    this.pupilsGroup = animatedElements.pupilsGroup;
    this.leftEye = animatedElements.leftEye;
    this.rightEye = animatedElements.rightEye;
    this.leftWheel = animatedElements.leftWheel;
    this.rightWheel = animatedElements.rightWheel;

    this.timers = {};

    this.eyeBlinking = this.eyeBlinking.bind(this);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);

    this.timers = {};
}

Animation.prototype = {
    checkSleeping: function (isSleeping) {
        isSleeping ? this.robotBody.classList.add('sleeping') : this.robotBody.classList.remove('sleeping');
    },

    handleAnimationEnd: function (resolve, subscriber, callback) {
        subscriber.removeEventListener('animationend', callback);
        resolve();
    },

    flinch: function () {
        var _this = this;
        _this.robotBody.classList.remove('sleeping');

        return new Promise(function (resolve, reject) {
            _this.robotBody.addEventListener('animationend', _this.handleAnimationEnd.bind(_this, resolve, _this.robotBody, _this.handleAnimationEnd));
            _this.robotBody.classList.add('awakening');
        })
    },

    awakening: function () {
        var _this = this;

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

    changeWheelDirection() {
        var _this = this;

        return {
            'right': function() {
                _this.leftWheel.classList.remove('left-wheel-rotate-back');
                _this.rightWheel.classList.remove('right-wheel-rotate-back');
                _this.leftWheel.classList.add('left-wheel-rotate-forward');
                _this.rightWheel.classList.add('right-wheel-rotate-forward');
            },
            'left': function() {
                _this.leftWheel.classList.remove('left-wheel-rotate-forward');
                _this.rightWheel.classList.remove('right-wheel-rotate-forward');
                _this.leftWheel.classList.add('left-wheel-rotate-back');
                _this.rightWheel.classList.add('right-wheel-rotate-back');
            },
            'up': function() {

            },
            'down': function() {
                
            }
        }
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
    var rightEyeOpenAnimation = robot.querySelector('#A-right-eye-open-animation');
    var leftEyeOpenAnimation = robot.querySelector('#A-left-eye-open-animation');
    var rightEyeCloseAnimation = robot.querySelector('#A-right-eye-close-animation');
    var leftEyeCloseAnimation = robot.querySelector('#A-left-eye-close-animation');
    var eyesGroup = robot.querySelector('#A-eyes-group');
    var pupilsGroup = eyesGroup.querySelector('#A-pupils-group');
    var leftEye = eyesGroup.querySelector('#A-left-eye');
    var rightEye = eyesGroup.querySelector('#A-right-eye');
    var leftWheel = robot.querySelector('#A-left-wheel');
    var rightWheel = robot.querySelector('#A-right-wheel');

    var robotAHeight = robotAModel.getBoundingClientRect().height;
    var robotAWidth = robotAModel.getBoundingClientRect().width;

    var posX = 0/* robotAModel.getBoundingClientRect().x */;
    var posY = 0/* robotAModel.getBoundingClientRect().y */;

    return {
        robot: {
            id: 1,
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
        },
        area: getRobotAAreaConfig()
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

/***/ "./app/config/robotB.js":
/*!******************************!*\
  !*** ./app/config/robotB.js ***!
  \******************************/
/*! exports provided: getRobotBConfig, getRobotBAreaConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRobotBConfig", function() { return getRobotBConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRobotBAreaConfig", function() { return getRobotBAreaConfig; });
function getRobotBConfig() {
    var robotBModel = document.querySelector('#robotB-svg');
    var robot = document.querySelector('#robotB');
    var robotBody = robot.querySelector('#robotB-body');
    var rightEyeOpenAnimation = robot.querySelector('#B-right-eye-open-animation');
    var leftEyeOpenAnimation = robot.querySelector('#B-left-eye-open-animation');
    var rightEyeCloseAnimation = robot.querySelector('#B-right-eye-close-animation');
    var leftEyeCloseAnimation = robot.querySelector('#B-left-eye-close-animation');
    var eyesGroup = robot.querySelector('#B-eyes-group');
    var pupilsGroup = eyesGroup.querySelector('#B-pupils-group');
    var leftEye = eyesGroup.querySelector('#B-left-eye');
    var rightEye = eyesGroup.querySelector('#B-right-eye');
    var leftWheel = robot.querySelector('#B-left-wheel');
    var rightWheel = robot.querySelector('#B-right-wheel');

    var robotBHeight = robotBModel.getBoundingClientRect().height;
    var robotBWidth = robotBModel.getBoundingClientRect().width;

    var posX = 0;
    var posY = 0;

    return {
        robot: {
            id: 2,
            svg: robotBModel,
            element: robot,
            posX,
            posY,
            robotHeight: robotBHeight,
            robotWidth: robotBWidth,
            speedX: 1.1,
            speedY: 1.1,
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
        },
        area: getRobotBAreaConfig()
    }
};

function getRobotBAreaConfig() {
    var robotBArea = document.querySelector('#robotB-area');
    var areaWidth = robotBArea.offsetWidth;

    var body = document.body;
    var html = document.documentElement;

    var a = window.getComputedStyle(body, null).getPropertyValue('padding');
    var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    var areaHeight = documentHeight - robotBArea.offsetTop;
    robotBArea.style.height = `${areaHeight - Number(window.getComputedStyle(body, null).getPropertyValue('padding').slice(0, -2))}px`; // subtracts the value of body padding

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
/* harmony import */ var _robot_HorizontalRobot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./robot/HorizontalRobot */ "./app/robot/HorizontalRobot.js");
/* harmony import */ var _robot_MultiDirectRobot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./robot/MultiDirectRobot */ "./app/robot/MultiDirectRobot.js");
/* harmony import */ var _animation_AnimatedRobot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./animation/AnimatedRobot */ "./app/animation/AnimatedRobot.js");
/* harmony import */ var _config_robotA__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config/robotA */ "./app/config/robotA.js");
/* harmony import */ var _config_robotB__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config/robotB */ "./app/config/robotB.js");






document.addEventListener('DOMContentLoaded', function () {
    var startAButton = document.querySelector('#robotA-go-button');
    var stopAButton = document.querySelector('#robotA-stop-button');

    var startBButton = document.querySelector('#robotB-go-button');
    var verticalMove = document.querySelector('#robotB-go-button--v');
    var stopBButton = document.querySelector('#robotB-stop-button');

    var robotAConfig = Object(_config_robotA__WEBPACK_IMPORTED_MODULE_3__["getRobotAConfig"])();
    //var robotAArea = getRobotAAreaConfig();
    var robotA = new _animation_AnimatedRobot__WEBPACK_IMPORTED_MODULE_2__["AnimatedRobot"](_robot_HorizontalRobot__WEBPACK_IMPORTED_MODULE_0__["HorizontalRobot"], robotAConfig);

    var robotBConfig = Object(_config_robotB__WEBPACK_IMPORTED_MODULE_4__["getRobotBConfig"])();
    var robotBArea = Object(_config_robotB__WEBPACK_IMPORTED_MODULE_4__["getRobotBAreaConfig"])();
    var robotB = new _animation_AnimatedRobot__WEBPACK_IMPORTED_MODULE_2__["AnimatedRobot"](_robot_MultiDirectRobot__WEBPACK_IMPORTED_MODULE_1__["MultiDirectRobot"], robotBConfig);

    startAButton.addEventListener('click', function (event) {
        robotA.moveHorizontally();
    });

    stopAButton.addEventListener('click', function (event) {
        robotA.stop();
    });

    startBButton.addEventListener('click', function (event) {
        robotB.moveHorizontally();
    });

    stopBButton.addEventListener('click', function (event) {
        robotB.stop();
    });

    verticalMove.addEventListener('click', function () {
        robotB.moveVertically();
    })
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

/***/ "./app/robot/HorizontalRobot.js":
/*!**************************************!*\
  !*** ./app/robot/HorizontalRobot.js ***!
  \**************************************/
/*! exports provided: HorizontalRobot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HorizontalRobot", function() { return HorizontalRobot; });
function HorizontalRobot({ robot, area } = config) {
    this.robot = robot;
    this.area = area;

    this.step = this.step.bind(this);
    this.update = this.update.bind(this);

    this.direction = 'right';
    this.handleDirectionChange = null;
    this.frames = {};
}

HorizontalRobot.prototype = {
    moveHorizontally: function (handleDirectionChange) {
        if (handleDirectionChange) {
            this.handleDirectionChange = handleDirectionChange;
            this.handleDirectionChange(this.direction);
        }

        for (var frame in this.frames) {
            if (this.frames.hasOwnProperty(frame)) {
                window.cancelAnimationFrame(this.frames[frame]);
            }
        }
        this.frames[this.robot.id] = window.requestAnimationFrame(this.step);
    },

    update: function () {
        this.robot.svg.style.transform = `translateX(${this.robot.posX}px) translateY(${this.robot.posY}px) translateZ(0)`;
    },

    step() {
        this.robot.posX += this.robot.speedX;

        if (this.robot.posX + this.robot.robotWidth > this.area.width) {
            this.robot.speedX = -this.robot.speedX;
            this.robot.posX = this.area.width - this.robot.robotWidth;
            this.direction = 'left';
            this.handleDirectionChange(this.direction);
        }

        if (this.robot.posX < 0) {
            this.robot.speedX = -this.robot.speedX;
            this.robot.posX = 0;
            this.direction = 'right';
            this.handleDirectionChange(this.direction);
        }

        this.update();

        this.frames[this.robot.id] = window.requestAnimationFrame(this.step);
    },

    stop: function () {
        window.cancelAnimationFrame(this.frames[this.robot.id]);
    }
}


/***/ }),

/***/ "./app/robot/MultiDirectRobot.js":
/*!***************************************!*\
  !*** ./app/robot/MultiDirectRobot.js ***!
  \***************************************/
/*! exports provided: MultiDirectRobot */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiDirectRobot", function() { return MultiDirectRobot; });
/* harmony import */ var _HorizontalRobot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HorizontalRobot */ "./app/robot/HorizontalRobot.js");


function MultiDirectRobot(config, area) {
    _HorizontalRobot__WEBPACK_IMPORTED_MODULE_0__["HorizontalRobot"].call(this, config, area);
    this.stepVertical = this.stepVertical.bind(this);
}

MultiDirectRobot.prototype = Object.create(_HorizontalRobot__WEBPACK_IMPORTED_MODULE_0__["HorizontalRobot"].prototype);
MultiDirectRobot.prototype.constructor = MultiDirectRobot;

MultiDirectRobot.prototype.stepVertical = function () {
    if (this.frames[this.robot.id]) {
        window.cancelAnimationFrame(this.frames[this.robot.id]);
        delete this.frames[this.robot.id];
    }
    this.robot.posY += this.robot.speedY;

    if (this.robot.posY + this.robot.robotHeight > this.area.height) {
        this.robot.speedY = -this.robot.speedY;
        this.robot.posY = this.area.height - this.robot.robotHeight;
    }

    if (this.robot.posY < 0) {
        this.robot.speedY = -this.robot.speedY;
        this.robot.posY = 0;
    }

    this.update();

    this.frames[this.robot.id] = window.requestAnimationFrame(this.stepVertical);
}

MultiDirectRobot.prototype.moveVertically = function (handleDirectionChange) {
    if (handleDirectionChange) {
        this.handleDirectionChange = handleDirectionChange;
    }

    window.cancelAnimationFrame(this.frames[this.robot.id]);
    this.frames[this.robot.id] = window.requestAnimationFrame(this.stepVertical);
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