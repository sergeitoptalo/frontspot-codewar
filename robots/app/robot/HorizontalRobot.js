export function HorizontalRobot({ robot, area } = config) {
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
