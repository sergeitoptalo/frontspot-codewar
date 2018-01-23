 module.exports = 
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

    let result = {};

    let previousElement = null;
    sortedEvaluatedArray.forEach((element, index, array) => {

        if (previousElement !== element) {
            result[element] = [];
            if (fn) {
                evaluatedArray.filter((filterElement, index) => {
                    if (filterElement == element) {
                        result[element].push(initialArray[index]);
                    }
                })
            } else {
                sortedEvaluatedArray.filter((filterElement, index) => {
                    if (filterElement == element) {
                        result[element].push(filterElement);
                    }
                })
            }
        }
        previousElement = element;
    })

    return result;
} 
