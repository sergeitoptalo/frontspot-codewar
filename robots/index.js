

function HorizontalRobot(robot) {
    this.robot = robot;
    this.robotBody = this.robot.querySelector('#robot-body');
    this.awakeningEndpoint = this.robot.querySelector('#robot-body-endpoint');
    this.openEyeEndpoint = document.querySelector('.open-eye-endpoint');
    this.rightEyeAnimation = document.querySelector('#right-eye-animation');
    this.leftEyeAnimation = document.querySelector('#left-eye-animation');
    this.eyesGroup = document.querySelector('#eyes-group');
    this.pupilsGroup = this.eyesGroup.querySelector('#pupils-group');
    this.leftEye = document.querySelector('#left-eye');
    this.rightEye = document.querySelector('#right-eye');
    this.awakeningEndpoint.addEventListener('animationend', () => this.awakening());
    this.openEyeEndpoint.addEventListener('animationend', () => this.lookingAround());
    
    this.isSleeping = true;

    this.awakening = function () {
       /*  var animateLeftEye = document.createElementNS('http://www.w3.org/2000/svg','animate');
        animateLeftEye.setAttributeNS('http://www.w3.org/1999/xlink','href','#left-eye');
        animateLeftEye.setAttributeNS(null,'attributeName','d');
       
        animateLeftEye.setAttributeNS(null,'from','M70 90 C 74 95, 76 92, 90 89, M90 89 C 76 92, 74 95, 70 90');
        animateLeftEye.setAttributeNS(null,'to','M70 90 C 69 72, 91 72, 90 90, M90 90 C 91 107, 69 107, 70 90');
        animateLeftEye.setAttribute('dur', '0.2s');



        var animateRightEye = document.createElementNS('http://www.w3.org/2000/svg','animate');
        animateRightEye.setAttributeNS('http://www.w3.org/1999/xlink','href','#right-eye');
        animateRightEye.setAttributeNS(null,'attributeName','d');
        animateRightEye.setAttributeNS(null,'attributeType','XML');
        animateRightEye.setAttributeNS(null,'from','M70 90 C 74 95, 76 92, 90 89, M90 89 C 76 92, 74 95, 70 90');
        animateRightEye.setAttributeNS(null,'to','M70 90 C 69 72, 91 72, 90 90, M90 90 C 91 107, 69 107, 70 90');
        animateRightEye.setAttribute('dur', '0.2s');
        animateRightEye.setAttribute('fill', 'freeze'); */


       // this.leftEye.appendChild(animateLeftEye);
       // this.eyesGroup.appendChild(animateRightEye);
       this.rightEyeAnimation.beginElement();
       this.leftEyeAnimation.beginElement();
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
