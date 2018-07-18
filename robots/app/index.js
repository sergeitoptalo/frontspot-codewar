import { HorizontalRobot } from './robot/robot';
import { getRobotAConfig, getRobotAAreaConfig } from './config/robotA';

document.addEventListener('DOMContentLoaded', function () {
    var startButton = document.querySelector('#robotA-go-button');
    var stopButton = document.querySelector('#robotA-stop-button');
    
    var robotAConfig = getRobotAConfig();
    var robotAArea = getRobotAAreaConfig();
    var robotA = new HorizontalRobot(robotAConfig, robotAArea);

    startButton.addEventListener('click', function (event) {
        robotA.go();
    });

    stopButton.addEventListener('click', function(event) {
        robotA.stop();
    })
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
