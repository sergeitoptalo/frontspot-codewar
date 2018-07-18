export function getRobotAConfig() {
    var robotAModel = document.querySelector('#robotA-svg');
    var robot = document.querySelector('#robotA');
    var robotBody = robot.querySelector('#robotA-body');
    var rightEyeOpenAnimation = robot.querySelector('#right-eye-open-animation');
    var leftEyeOpenAnimation = robot.querySelector('#left-eye-open-animation');
    var rightEyeCloseAnimation = robot.querySelector('#right-eye-close-animation');
    var leftEyeCloseAnimation = robot.querySelector('#left-eye-close-animation');
    var eyesGroup = robot.querySelector('#eyes-group');
    var pupilsGroup = eyesGroup.querySelector('#pupils-group');
    var leftEye = eyesGroup.querySelector('#left-eye');
    var rightEye = eyesGroup.querySelector('#right-eye');
    var leftWheel = robot.querySelector('#left-wheel');
    var rightWheel = robot.querySelector('#right-wheel');

    var robotAHeight = robotAModel.getBoundingClientRect().height;
    var robotAWidth = robotAModel.getBoundingClientRect().width;

    var posX = robotAModel.getBoundingClientRect().x;
    var posY = robotAModel.getBoundingClientRect().y;

    return {
        robot: {
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
