module.exports = function trapRainWater(elevationMap) {
    let state = transformElevationMap(elevationMap);

    function transformElevationMap(elevationMap) {
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

    let waterConfig = [];
    let rowFirstStoneIndex = null;
    let rowLastStoneIndex = null;
    state.forEach((row, index) => {
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

    let waterCount = 0;
    waterConfig.forEach((row, index) => {
        if (row) {
            waterCount += row.length;
        }
    })

    return waterCount;
}
