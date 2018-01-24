export default class Controls {
    constructor(wall, columnsNumber) {
        this.wall = wall;
        this.columnsNumber = columnsNumber;
        this.controlsContainer = document.querySelector('#controls-container');
        this.controlsContainer.addEventListener('click', (event) => this.detectClickTarget(event))
    }

    detectClickTarget(event) {
        let target = event.target;
        if (target.dataset) {
            let action = target.dataset.action;
            switch(action) {
                case 'increase': {
                    this.wall.addStone(target.parentNode.dataset.column);
                    break;
                };

                case 'reduce': {
                    this.wall.removeStone(target.dataset.column);
                    break;
                };
                default: break;
            }
            
        }

    }

    render() {
        let controlsMarkup = ``;
        for (let i = 0; i <= this.columnsNumber; i++) {
            controlsMarkup += `
        <td data-column="${i}">
            <button data-action="increase">+</button>
            <button data-action="reduce">-</button>
        </td>`
        }
        this.controlsContainer.innerHTML = `
        <table>
            <tr>
                ${controlsMarkup}
            </tr>
        </table>
    `
    }
}
