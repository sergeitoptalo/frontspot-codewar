document.addEventListener('DOMContentLoaded', () => {
    const elevationMap = [1, 0, 2, 3, 5, 6, 8, 7, 6, 0, 0, 0];
    let runButton = document.querySelector('#run-button');
    runButton.addEventListener();

    let container = document.querySelector('#container');
    let a = new App(elevationMap, container);
    a.render();
    a.rain();
})

class App {
    constructor(config, container) {
        this.state = this.transformConfig(config);
        this.container = container;
        this.renderControls(this.state.length);
    }

    transformConfig(elevationMap) {
        let maxValue = Math.max(...elevationMap);
        let result = [];
        for (let i = 0; i < maxValue; i++) {
            result.push([]);
        }
        elevationMap.forEach((element, index) => {
            let rowIndex = 0;
            for (rowIndex; rowIndex < element; rowIndex++) {
                result[rowIndex].push(1);
            }
            for (rowIndex; rowIndex < maxValue; rowIndex++) {
                result[rowIndex].push(0);
            }
        })
        return result.reverse();
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

    renderControls(controlsNumber) {
        let controlsMarkup = ``;
        for (let i = 0; i <= controlsNumber; i++) {
            controlsMarkup += `
            <td data-column="${i}">
                <button>+</button>
                <button>-</button>
            </td>`
        }
        let controlsContainer = document.querySelector('#controls-container');
        controlsContainer.innerHTML = `
            <table>
                <tr>
                    ${controlsMarkup}
                </tr>
            </table>
        `
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
            }).join('')}
          
        </table>
      `
    }
}
