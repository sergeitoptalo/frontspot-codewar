document.addEventListener('DOMContentLoaded', () => {
    let config = [
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1]
    ];

    let container = document.querySelector('#container');
    let a= new App(config, container);
    a.render();
})

class App {
    constructor(config, container) {
        this.state = config;
        this.container = container;

    }

    render() {
        container.innerHTML = `
        <table>
        ${this.state.map(row => {
                return `<tr>
                    ${
                    row.map(element => {
                        return `<td ${element === 1 ? `class="wall"` : ``}></td>`;
                    }).join('')
                    }
                </tr>`
            }).join('')}
          
        </table>
      `
    }
}
