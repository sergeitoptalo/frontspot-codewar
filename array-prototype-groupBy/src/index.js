document.addEventListener('DOMContentLoaded', () => {
    Array.prototype.groupBy = groupBy;
    let runButton = document.querySelector('#run-button');
    let outputContainer = document.querySelector('#output');

    runButton.addEventListener('click', () => {
        let inputArrayValue = document.querySelector('#input-array').value;
        let functionValue = document.querySelector('#input-function').value;
        let resultString = ``;

        if (inputArrayValue) {
            inputArrayValue = inputArrayValue.split(',').map(element => Number(element));
            let result = inputArrayValue.groupBy(eval(functionValue));

            Object.keys(result).forEach(key => {
                resultString += `<div class="output-object-inner-key">
                    <span class="output-key">${key}</span>: [<span class="output-value">${result[key].reduce((markup, element) => markup === `` ? markup + `${element}` : markup + `, ${element}`, ``)}</span>]</div>`
            })
        }
        outputContainer.innerHTML = `<div>{</div>${resultString}<div>}</div>`;
    })
})

function groupBy(fn) {
    let initialArray = this;
    let evaluatedArray = [];
    let sortedEvaluatedArray = [];

    if (fn) {
        evaluatedArray = initialArray.map(fn);
        sortedEvaluatedArray = selectionSort([].concat(evaluatedArray));
    } else {
        sortedEvaluatedArray = selectionSort(initialArray)
    }

    function selectionSort(array) {
        let minIndex = null;
        let temp = null;

        for (let i = 0; i < array.length; i++) {
            minIndex = i;
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] < array[minIndex]) {
                    temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
        }
        return array;
    }

    let final = {};

    let previousElement = null;
    sortedEvaluatedArray.forEach((element, index, array) => {

        if (previousElement !== element) {
            final[element] = [];
            if (fn) {
                evaluatedArray.filter((filterElement, index) => {
                    if (filterElement == element) {
                        final[element].push(initialArray[index]);
                    }
                })
            } else {
                sortedEvaluatedArray.filter((filterElement, index) => {
                    if (filterElement == element) {
                        final[element].push(filterElement);
                    }
                })
            }
        }
        previousElement = element;
    })

    return final;
} 
