import { Animation } from './Animation';

export function AnimatedRobot(Robot, config) {
    this.robot = new Robot(config);
    this.animation = new Animation(config);
    this.animatedElements = config.animatedElements;
    this.isSleeping = true;

    this.animatedElements.robotBody.classList.add('sleeping');
}

AnimatedRobot.prototype = {
    moveHorizontally: function () {
        if (this.isSleeping) {
            this.animation.flinch()
                .then(() => {
                    this.animation.awakening()
                        .then(() => {
                            this.isSleeping = false;
                            this.robot.moveHorizontally();
                        })
                })
        } else {
            this.robot.moveHorizontally();
        }
    },

    moveVertically: function () {
        if (this.isSleeping) {
            this.animation.flinch()
                .then(() => {
                    this.animation.awakening()
                        .then(() => {
                            this.isSleeping = false;
                            this.robot.moveVertically();
                        })
                })
        } else {
            this.robot.moveVertically();
        }
    },

    stop: function () {
        this.robot.stop();
    }
}
