const config = {
    /*   field: [
          [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
          [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ] */
};

const calculateWindowSize = () => {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    return {
        screenHeight,
        screenWidth
    }
};


class Game {
    constructor(screenHeight, screenWidth) {
        this.state = [];
        this.cellHeight = 10;
        this.cellWidth = 10;
        this.cellsInRow = 0;
        this.rows = 0;
        this.screenHeight = screenHeight;
        this.screenWidth = screenWidth;
        this.timer = null;
    }

    drawInitialState() {
        this.calculateCellsInRow();
        this.calculateRowsNumber();
        this.createGameState();
        this.draw();
    }

    calculateCellsInRow() {
        this.cellsInRow = this.screenWidth / this.cellWidth;
        let actualCellSize = this.screenWidth / this.cellsInRow;
        this.cellHeight = actualCellSize;
        this.cellWidth = actualCellSize;
    }

    calculateRowsNumber() {
        this.rows = Math.floor(this.screenHeight / this.cellHeight);
    }

    createGameState() {
        for (let i = 0; i <= this.rows; i++) {
            let row = [];
            for (let j = 0; j <= this.cellsInRow; j++) {
                let value = Math.round(Math.random());
                if (value) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            this.state.push([].concat(row));
        }
    }

    draw() {
        let canvas = document.getElementById('canvas');
        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            let x = 0;
            let y = 0;

            this.state.forEach(row => {
                row.forEach(cell => {
                    if (cell === 0) {
                        ctx.fillStyle = 'rgba(255, 255, 200, 1)';
                        ctx.fillRect(x, y, this.cellWidth, this.cellHeight);
                        ctx.strokeRect(x, y, this.cellWidth, this.cellHeight);
                        ctx.strokeStyle = 'black';
                        x = x + this.cellWidth;
                    } else {
                        ctx.fillStyle = 'rgba(0, 200, 200, 1)';
                        ctx.fillRect(x, y, this.cellWidth, this.cellHeight);
                        ctx.strokeRect(x, y, this.cellWidth, this.cellHeight);
                        ctx.strokeStyle = 'white';
                        x = x + this.cellWidth;
                    }
                })
                x = 0;
                y = y + this.cellHeight;
            })
        }
    }

    updateState() {
        let newState = this.state.map(row => [].concat(row));
        this.state.forEach((row, rowIndex, rowArray) => {
            let previousRowIndex = rowIndex === 0 ? (this.state.length - 1) : rowIndex - 1;
            let nextRowIndex = rowIndex === (this.state.length - 1) ? 0 : rowIndex + 1;
            row.forEach((cell, cellIndex, cellArray) => {
                let previousCellIndex = cellIndex === 0 ? cellArray.length - 1 : cellIndex - 1;
                let nextCellIndex = cellIndex === cellArray.length - 1 ? 0 : cellIndex + 1;

                let neighbours = [];
                neighbours.push(cellArray[previousCellIndex]);
                neighbours.push(cellArray[nextCellIndex]);
                neighbours.push(rowArray[previousRowIndex][previousCellIndex]);
                neighbours.push(rowArray[previousRowIndex][cellIndex]);
                neighbours.push(rowArray[previousRowIndex][nextCellIndex]);
                neighbours.push(rowArray[nextRowIndex][previousCellIndex]);
                neighbours.push(rowArray[nextRowIndex][cellIndex]);
                neighbours.push(rowArray[nextRowIndex][nextCellIndex]);

                let result = neighbours.filter(neighbour => neighbour === 1);
                if (result.length === 3 && cell === 0) {
                    newState[rowIndex][cellIndex] = 1;
                }
                if (result.length < 2 || result.length > 3) {
                    newState[rowIndex][cellIndex] = 0;
                }
            })
        });
        this.state = newState;
    }

    startGame() {
        this.timer = window.setInterval(() => {
            this.updateState();
            this.draw();
        }, 100);
    }

    stopGame() {
        window.clearInterval(this.timer);
    }
}

const getInitialMarkup = (screenHeight, screenWidth) => {
    document.body.innerHTML = `
    <canvas id="canvas" height="${screenHeight}" width="${screenWidth - 50}"></canvas>
    <button id="start-button">Start</button>
    <button id="stop-button">Stop</button>
   `;
};

document.addEventListener('DOMContentLoaded', () => {
    let { screenHeight, screenWidth } = calculateWindowSize();
    getInitialMarkup(screenHeight, screenWidth);

    let game = new Game(screenHeight, screenWidth);
    game.drawInitialState();

    const startButton = document.querySelector('#start-button');
    const stopButton = document.querySelector('#stop-button');

    startButton.addEventListener('click', () => game.startGame());
    stopButton.addEventListener('click', () => game.stopGame());
});
