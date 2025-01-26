export function kronecker(inputArray, scaleFactor, dimension) {
    const rows = dimension;
    const cols = dimension;

    // Initialize the output array with the new dimensions
    const outputArray = Array(rows * scaleFactor)
        .fill(0)
        .map(() => Array(cols * scaleFactor).fill(0));

    // Fill the output array by repeating values
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const value = inputArray[i + j * dimension]
            for (let di = 0; di < scaleFactor; di++) {
                for (let dj = 0; dj < scaleFactor; dj++) {
                    outputArray[i * scaleFactor + di][j * scaleFactor + dj] = value;
                }
            }
        }
    }

    return outputArray;
}
