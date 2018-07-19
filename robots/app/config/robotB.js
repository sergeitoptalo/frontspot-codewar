export function getRobotBConfig() {
    var robotBModel = document.querySelector('#robotB-svg');
    var robot = document.querySelector('#robotB');
    var robotBody = robot.querySelector('#robotB-body');
    var rightEyeOpenAnimation = robot.querySelector('#B-right-eye-open-animation');
    var leftEyeOpenAnimation = robot.querySelector('#B-left-eye-open-animation');
    var rightEyeCloseAnimation = robot.querySelector('#B-right-eye-close-animation');
    var leftEyeCloseAnimation = robot.querySelector('#B-left-eye-close-animation');
    var eyesGroup = robot.querySelector('#B-eyes-group');
    var pupilsGroup = eyesGroup.querySelector('#B-pupils-group');
    var leftEye = eyesGroup.querySelector('#B-left-eye');
    var rightEye = eyesGroup.querySelector('#B-right-eye');
    var leftWheel = robot.querySelector('#B-left-wheel');
    var rightWheel = robot.querySelector('#B-right-wheel');

    var robotBHeight = robotBModel.getBoundingClientRect().height;
    var robotBWidth = robotBModel.getBoundingClientRect().width;

    var posX = 0/* robotBModel.getBoundingClientRect().x */;
    var posY = 0/* robotBModel.getBoundingClientRect().y */;

    return {
        robot: {
            id: 2,
            svg: robotBModel,
            element: robot,
            posX,
            posY,
            robotHeight: robotBHeight,
            robotWidth: robotBWidth,
            speedX: 1.1,
            speedY: 1.1,
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

export function getRobotBAreaConfig() {
    var robotBArea = document.querySelector('#robotB-area');
    var areaWidth = robotBArea.offsetWidth;
    var areaHeight = robotBArea.offsetHeight;

    return {
        height: areaHeight,
        width: areaWidth
    }
}
