import { RobotAnimation } from '../animation/animation';

export function HorizontalRobot({ robot, animatedElements } = config, area) {
    this.robot = robot;
    this.isSleeping = true;
    this.robotAnimation = new RobotAnimation(animatedElements, this.isSleeping);
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
                            _this.robotAnimation.moving().forward();
                            _this.frames.robotA = window.requestAnimationFrame(_this.step);
                        })
                })

            // this.robotBody.classList.add('awakening');
        } else {
            this.robotAnimation.moving().forward();
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
        }
        // вылетел ли мяч левее стены?
        if (this.robot.posX < 0) {
            this.robot.speedX = -this.robot.speedX;
            this.robot.posX = 0;
        }

        this.update();

        this.frames.robotA = window.requestAnimationFrame(this.step);
    },

    stop: function () {
        this.robotAnimation.stopMoving();
        window.cancelAnimationFrame(this.frames.robotA);
    }
}
