/*   
Wall config: 
       -1 - water;
        0 - space;
        1 - stone;
*/

export default class Wall {
    constructor(columnsNumber, container) {
        this.state = [];
        this.row = [];
        this.columnsNumber = columnsNumber;
        this.container = container;
        this.addNewRow();
        this.render();
    }

    rain() {
        this.state.wasRain = true;
        this.state.forEach((row, rowIndex, rowArray) => {
            let firstStoneIndex = row.indexOf(1);
            let lastStoneIndex = row.lastIndexOf(1);

            for (let i = firstStoneIndex; i < lastStoneIndex; i++) {
                if (row[i] === 0) {
                    row[i] = -1;
                }
            }
        });

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
            if (row[columnIndex] === 1 && index === array.length - 1) {
                this.addNewRow(columnIndex);
            }
            if (row[columnIndex] <= 0 && !wallBorder) {
                row[columnIndex] = 1;
                wallBorder = 1;
            }
        });

        this.render();
    }

    removeStone(columnIndex) {
        let column = this.state.map((row) => {
            return row[columnIndex];
        });

        let lastStoneIndex = column.lastIndexOf(1);

        if (lastStoneIndex !== -1) {
            this.state[lastStoneIndex][columnIndex] = 0;

            if (this.state[lastStoneIndex].some(cell => cell === -1)) {
                this.state[lastStoneIndex].forEach((cell, cellIndex, cellsArray) => {
                    if (cell === -1) {
                        cellsArray[cellIndex] = 0;
                    }
                });

                this.rain()
            } else {
                this.render()
            };
        }
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
