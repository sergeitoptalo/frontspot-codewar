import { HorizontalRobot } from './robot/robot';
import { getRobotAConfig, getRobotAAreaConfig } from './config/robotA';

document.addEventListener('DOMContentLoaded', function () {
    var startAButton = document.querySelector('#robotA-go-button');
    var stopAButton = document.querySelector('#robotA-stop-button');

    var startBButton = document.querySelector('#robotB-go-button');
    var stopBButton = document.querySelector('#robotB-stop-button');

    var robotAConfig = getRobotAConfig();
    var robotAArea = getRobotAAreaConfig();
    var robotA = new HorizontalRobot(robotAConfig, robotAArea);

    var robotBConfig = getRobotAConfig();
    var robotBArea = getRobotAAreaConfig();
    var robotB = new HorizontalRobot(robotBConfig, robotBArea);

    startAButton.addEventListener('click', function (event) {
        robotA.go();
    });

    stopAButton.addEventListener('click', function (event) {
        robotA.stop();
    });

    startBButton.addEventListener('click', function (event) {
        robotB.go();
    });

    stopBButton.addEventListener('click', function (event) {
        robotB.stop();
    });
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
