import Controls from './controls.js';

export default class Wall {
    constructor(columnsNumber, container) {
        this.state = [];
        // this.emptyRow = [];
        this.row = [];
        this.columnsNumber = columnsNumber;
        this.container = container;
        this.controls = new Controls(this, columnsNumber).render();
        this.addNewRow();
        this.render();
    }

    rain() {
        this.state.forEach((row, rowIndex, rowArray) => {
            let firstStoneIndex = null;
            let lastStoneIndex = null;

            row.forEach((element, index, array) => {
                if (index !== 0 || index !== array.length - 1) {
                    if (array[index - 1] === 1 && array[index + 1] === 1) {
                        array[index] = -1;
                    }
                }
            })
        })
        /*         let waterConfig = [];
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
                }) */

        this.render();
    }

    addNewRow(stoneIndex) {
        this.row.splice(0, this.row.length);
        for (let i = 0; i < this.columnsNumber; i++) {
            this.row.push(0);
        }

        if (stoneIndex) {
            this.row[stoneIndex] = 1;
        }

        this.state.push([...this.row]);
    }

    addStone(columnIndex) {
        let wallBorder = 0;
        this.state.forEach((row, index, array) => {
            if (row[columnIndex] && index === array.length - 1) {
                this.addNewRow(columnIndex);
            }
            if (!row[columnIndex] && !wallBorder) {
                row[columnIndex] = 1;
                wallBorder = 1;
            }
        });

        this.render();
    }

    removeStone(columnIndex) {

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
