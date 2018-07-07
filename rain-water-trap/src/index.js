import Wall from './wall.js';
import Controls from './controls.js';

document.addEventListener('DOMContentLoaded', () => {
    let runButton = document.querySelector('#run-button');

    let container = document.querySelector('#container');
    let controls;

    let detectClickTarget = (event) => {
        controls.detectClickTarget(event)
    }

    runButton.addEventListener('click', () => {
        let initialColumnsNumber = document.querySelector('#columns-number').value;
        let wall = new Wall(initialColumnsNumber, container);
        if (controls) {
            controls.getControlsContainer().removeEventListener('click', detectClickTarget);
        }
        controls = new Controls(wall, initialColumnsNumber);
        controls.getControlsContainer().addEventListener('click', detectClickTarget);
    });
})

