export function transformConfig(elevationMap) {
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
