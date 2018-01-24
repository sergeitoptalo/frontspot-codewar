import Wall from './wall.js';

document.addEventListener('DOMContentLoaded', () => {
    //const elevationMap = [1, 0, 2, 3, 5, 6, 8, 7, 6, 0, 0, 0];

    let runButton = document.querySelector('#run-button');


    //runButton.addEventListener();

    let container = document.querySelector('#container');

    runButton.addEventListener('click', () => {
        let initialColumnsNumber = document.querySelector('#columns-number').value;
        new Wall(initialColumnsNumber, container)
    });
})

