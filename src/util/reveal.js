export const revealed = (arr, x, y, newNonMinesCount) => {
    
    if(arr[x][y].revealed){
        return {arr, newNonMinesCount};
    }

    // Stack of all the cells we want to reveal
    let toReveal = [];
    toReveal.push(arr[x][y]);
    while (toReveal.length !== 0) {
        
        let single = toReveal.pop();

        if(!single.revealed) {
            newNonMinesCount--;
            single.revealed = true;
        }

        if(single.value !== 0){
            break;
        }

        const neighborsOffsets = [
            [-1, -1], [-1, 0], [-1, 1],
            [0 , -1],          [0 , 1],
            [1 , -1], [1 , 0], [1 , 1]
        ];

        neighborsOffsets.forEach(offset => {
            let neighborX = single.x + offset[0];
            let neighborY = single.y + offset[1];

            if (
                neighborX >= 0 && neighborX <= arr.length - 1 &&
                neighborY >= 0 && neighborY <= arr[0].length - 1 &&
                !arr[neighborX][neighborY].revealed
            ) {
                if(arr[neighborX][neighborY].value === 0){
                    toReveal.push(arr[neighborX][neighborY]);
                }

                arr[neighborX][neighborY].revealed = true;
                newNonMinesCount--;
            }
        });
        
    };

    return {arr, newNonMinesCount};
};