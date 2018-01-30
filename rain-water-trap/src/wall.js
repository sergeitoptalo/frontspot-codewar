import Controls from './controls.js';

export default class App {
    constructor(columnsNumber, container) {
        this.state = [];
        this.emptyRow = [];
        this.container = container;
        this.controls = new Controls(this, columnsNumber).render();
        this.renderInitialState(columnsNumber);
    }

    rain() {
        let waterConfig = [];
        let rowFirstStoneIndex = null;
        let rowLastStoneIndex = null;
        this.state.forEach((row, index) => {
            waterConfig.push([]);
            row.forEach((element, elIndex) => {
                if (element === 1 && rowFirstStoneIndex === null) {
                    rowFirstStoneIndex = elIndex;
                }
                if (element === 1 && rowFirstStoneIndex !== null && elIndex !== rowFirstStoneIndex) {
                    rowLastStoneIndex = elIndex;
                    for (let i = rowLastStoneIndex - 1; i > rowFirstStoneIndex; i--) {
                        waterConfig[index].push(i);
                    }
                    rowFirstStoneIndex = rowLastStoneIndex;
                    rowLastStoneIndex = null;
                }
            })
            if (!waterConfig[index]) {
                waterConfig[index] = null;
            }
            rowFirstStoneIndex = null;
            rowLastStoneIndex = null;
        })

        waterConfig.forEach((row, index) => {
            if (row) {
                row.forEach(element => {
                    this.state[index][element] = 2;
                })
            }
        })

        this.render();
    }

    addStone(columnIndex, wallLevel) {
        let state = this.state;
        if (this.state.length <= wallLevel) {
            this.state.push([].concat(this.emptyRow))
        }
        this.state[wallLevel][columnIndex] = 1;
        this.render();
    }

    removeStone(columnIndex) {

    }

    renderInitialState(columnsNumber) {
        for (let i = 0; i <= columnsNumber; i++) {
            this.emptyRow.push(0);
        }
        this.state.push([].concat(this.emptyRow));
        this.render();
    }

    render() {
        container.innerHTML = `
        <table>
        ${this.state.map(row => {
                return `<tr>
                    ${
                    row.map(element => {
                        return `<td ${element !== 0 ? `class="${element === 1 ? `wall` : `water`}"` : ``}></td>`;
                    }).join('')
                    }
                </tr>`
            }).reverse().join('')}
          
        </table>
      `
    }
}
