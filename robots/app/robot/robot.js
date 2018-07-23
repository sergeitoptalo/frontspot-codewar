import { Animation } from '../animation/Animation';

export function HorizontalRobot({ robot, animatedElements } = config, area) {
    this.robot = robot;
    this.isSleeping = true;
    this.robotAnimation = new RobotAnimation(animatedElements, this.isSleeping);
    this.robotAnimation.checkSleeping(this.isSleeping);
    this.area = area;
    this.step = this.step.bind(this);
    this.stepVertical = this.stepVertical.bind(this);
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
    },

    stepVertical() {
        this.robot.posY += this.robot.speedY;
        // вылетел ли мяч правее стены?
        if (this.robot.posY + this.robot.robotHeight > this.area.height) {
            this.robot.speedY = -this.robot.speedY;
            this.robot.posY = this.area.height - this.robot.robotHeight;
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

    vertical() {
        window.cancelAnimationFrame(this.frames.robotA);
        this.frames.robotB = window.requestAnimationFrame(this.stepVertical);
    }
}
