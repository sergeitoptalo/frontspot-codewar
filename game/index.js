const gliderConfig = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const calculateWindowSize = () => {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight - 50;

    return {
        screenHeight,
        screenWidth
    }
};


class Game {
    constructor(screenHeight, screenWidth, cellSize, gameState = []) {
        this.state = gameState;
        this.cellHeight = cellSize;
        this.cellWidth = cellSize;
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
                        ctx.fillStyle = 'rgba(227, 235, 239, 1)';
                        ctx.fillRect(x, y, this.cellWidth, this.cellHeight);
                        // ctx.strokeRect(x, y, this.cellWidth, this.cellHeight);
                        //ctx.strokeStyle = 'white';
                        x = x + this.cellWidth + 1;
                    } else {
                        ctx.fillStyle = 'rgba(63, 121, 150, 1)';
                        ctx.fillRect(x, y, this.cellWidth, this.cellHeight);
                        // ctx.strokeRect(x, y, this.cellWidth, this.cellHeight);
                        //ctx.strokeStyle = '#4d6819';
                        x = x + this.cellWidth + 1;
                    }
                })
                x = 0;
                y = y + this.cellHeight + 1;
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
    <canvas id="canvas" height="${screenHeight}" width="${screenWidth}"></canvas>
    <div class="controls-container">
        <div class="cell-size-input-container">
            <input type="number" id="cell-size" />
            <button id="config-button">Ok</button>
            <input type="checkbox" id="turn-glider">
            <label for="turn-glider" class="glider-label">Glider</label>
        </div>
        <div class="controls">
            <button id="start-button">Start</button>
            <button id="stop-button">Stop</button>
        </div>
    </div>
   `;
};

document.addEventListener('DOMContentLoaded', () => {
    let { screenHeight, screenWidth } = calculateWindowSize();
    getInitialMarkup(screenHeight, screenWidth);
    const congifButton = document.querySelector('#config-button');

    let game = null;

    congifButton.addEventListener('click', () => {
        if (document.querySelector('#cell-size').value) {
            let cellSize = Number(document.querySelector('#cell-size').value);
            let enableGlider = document.querySelector('#turn-glider').checked;

            if (enableGlider) {
                game = new Game(screenHeight, screenWidth, cellSize, gliderConfig);
                game.draw();
            } else {
                game = new Game(screenHeight, screenWidth, cellSize);
                game.drawInitialState();
            }
        }
    });

    const startButton = document.querySelector('#start-button');
    const stopButton = document.querySelector('#stop-button');

    startButton.addEventListener('click', () => {
        startButton.disabled = true;
        game.startGame();
    });
    stopButton.addEventListener('click', () => {
        startButton.disabled = false;
        game.stopGame();
    });
});
