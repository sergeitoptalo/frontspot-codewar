export function getRobotAConfig() {
    var robotAModel = document.querySelector('#robotA-svg');
    var robot = document.querySelector('#robotA');
    var robotBody = robot.querySelector('#robotA-body');
    var rightEyeOpenAnimation = robot.querySelector('#A-right-eye-open-animation');
    var leftEyeOpenAnimation = robot.querySelector('#A-left-eye-open-animation');
    var rightEyeCloseAnimation = robot.querySelector('#A-right-eye-close-animation');
    var leftEyeCloseAnimation = robot.querySelector('#A-left-eye-close-animation');
    var eyesGroup = robot.querySelector('#A-eyes-group');
    var pupilsGroup = eyesGroup.querySelector('#A-pupils-group');
    var leftEye = eyesGroup.querySelector('#A-left-eye');
    var rightEye = eyesGroup.querySelector('#A-right-eye');
    var leftWheel = robot.querySelector('#A-left-wheel');
    var rightWheel = robot.querySelector('#A-right-wheel');

    var robotAHeight = robotAModel.getBoundingClientRect().height;
    var robotAWidth = robotAModel.getBoundingClientRect().width;

    var posX = 0/* robotAModel.getBoundingClientRect().x */;
    var posY = 0/* robotAModel.getBoundingClientRect().y */;

    return {
        robot: {
            id: 1,
            svg: robotAModel,
            element: robot,
            posX,
            posY,
            robotHeight: robotAHeight,
            robotWidth: robotAWidth,
            speedX: 1.1,
            accelX: 0.2,
        },
        animatedElements: {
            robotBody,
            rightEyeOpenAnimation,
            leftEyeOpenAnimation,
            rightEyeCloseAnimation,
            leftEyeCloseAnimation,
            eyesGroup,
            pupilsGroup,
            leftEye,
            rightEye,
            leftWheel,
            rightWheel
        }
    }
};

export function getRobotAAreaConfig() {
    var robotAArea = document.querySelector('#robotA-area');
    var areaWidth = robotAArea.offsetWidth;
    var areaHeight = robotAArea.offsetHeight;

    return {
        height: areaHeight,
        width: areaWidth
    }
}
