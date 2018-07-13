

function HorizontalRobot(robot) {
    this.robot = robot;
    this.robotBody = this.robot.querySelector('#robot-body');
    this.awakeningEndpoint = this.robot.querySelector('#robot-body-endpoint');
    this.openEyeEndpoint = document.querySelector('.open-eye-endpoint');
    // this.leftEyeAnimation = document.querySelector('#left-eye-animation');
    this.eyesGroup = document.querySelector('#eyes-group');
    this.pupilsGroup = this.eyesGroup.querySelector('#pupils-group');
    this.leftEye = document.querySelector('#left-eye');
    this.rightEye = docement.querySelector('#right-eye');
    this.awakeningEndpoint.addEventListener('animationend', () => this.awakening());
    this.openEyeEndpoint.addEventListener('animationend', () => this.lookingAround());
    
    this.isSleeping = true;

    this.awakening = function () {
        var animateLeftEye = document.createElementNS('http://www.w3.org/2000/svg','animate');
        animate.setAttributeNS(null,'attributeName','d');
        animate.setAttributeNS(null,'from','M70 90 C 74 95, 76 92, 90 89, M90 89 C 76 92, 74 95, 70 90');
        animate.setAttributeNS(null,'to','M70 90 C 69 72, 91 72, 90 90, M90 90 C 91 107, 69 107, 70 90');
        animate.setAttribute('dur', '0.2s');

        var animateRightEye = document.createElementNS('http://www.w3.org/2000/svg','animate');
        animate.setAttributeNS(null,'attributeName','d');
        animate.setAttributeNS(null,'from','M44 89 C 58 92, 60 95, 64 90, M64 90 C 60 95, 58 92, 44 89');
        animate.setAttributeNS(null,'to','M44 90 C 43 72, 65 72, 64 90, M64 90 C 65 107, 43 107, 44 90');
        animate.setAttribute('dur', '0.2s');

        this.leftEye.appendChild(animateLeftEye);
        this.rightEye.appendChild(animateRightEye);
        this.pupilsGroup.classList.add('open');
    }

    this.lookingAround = function() {
        this.eyesGroup.classList.add('look-around');
    }
}

HorizontalRobot.prototype = {
    awake: function () {
        if (this.isSleeping) {
            this.isSleeping = !this.isSleeping;
        }
    },
    go: function () {
        if (this.isSleeping) {
            this.awake();
            this.robotBody.classList.add('awakening');
        }
    }
}

var start = document.querySelector('#robot1-go');
var robot1Model = document.querySelector('#robot1-svg');
var robot1 = new HorizontalRobot(robot1Model);

start.addEventListener('click', function (event) {
    robot1.go();
})

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
