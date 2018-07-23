import { Animation } from './Animation';

export function AnimatedRobot(Robot, config) {
    this.robot = new Robot(config);
    this.animation = new Animation(config);
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
