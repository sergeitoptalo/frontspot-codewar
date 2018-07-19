import { RobotAnimation } from '../animation/animation';
import { HorizontalRobot } from './HorizontalRobot';

export function MultiDirectRobot(config, area) {
    HorizontalRobot.call(this, config, area);
    this.stepVertical = this.stepVertical.bind(this);
}

MultiDirectRobot.prototype = Object.create(HorizontalRobot.prototype);
MultiDirectRobot.prototype.constructor = MultiDirectRobot;

MultiDirectRobot.prototype.stepVertical = function () {
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

MultiDirectRobot.prototype.vertical = function () {
    window.cancelAnimationFrame(this.frames[this.robot.id]);
    this.frames[this.robot.id] = window.requestAnimationFrame(this.stepVertical);
}

