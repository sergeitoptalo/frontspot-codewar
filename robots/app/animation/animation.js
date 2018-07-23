export function Animation({ animatedElements } = config) {
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
