export default class Controls {
    constructor(wall, columnsNumber) {
        this.wall = wall;
        this.columnsNumber = columnsNumber;
        this.controlsContainer = document.querySelector('#controls-container');

        this.render();
    }

    getControlsContainer() {
        return this.controlsContainer;
    }

    detectClickTarget(event) {
        let target = event.target;
        if (target.dataset) {
            let action = target.dataset.action;
            switch (action) {
                case 'increase': {
                    this.wall.addStone(target.parentNode.dataset.column);
                    break;
                };
                case 'reduce': {
                    this.wall.removeStone(target.parentNode.dataset.column);
                    break;
                };
                case 'run-rain': {
                    this.wall.rain();
                    break;
                }
                default: break;
            }
        }
    }

    render() {
        let controlsMarkup = ``;
        for (let i = 0; i < this.columnsNumber; i++) {
            controlsMarkup += `
        <td data-column="${i}">
            <button data-action="increase">&#9650;</button>
            <button data-action="reduce">&#9660;</button>
        </td>`
        }

        this.controlsContainer.innerHTML = `
        <button data-action="run-rain" class="rain-button">Rain</button>
        <table class="controls-table">
            <tr>
                ${controlsMarkup}
            </tr>
        </table>
        
    `
    }
}
