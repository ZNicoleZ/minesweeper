export default (row, col, bombs) => {
    
    let board = [];
    let mineLocation = [];

    for(let x=0; x<row; x++){

        let subCol = [];

        for(let y=0; y<col; y++){
            subCol.push({
                value: 0,
                revealed: false,
                x: x,
                y: y,
                flagged: false,
            });
        }

        board.push(subCol);
    }

    // Set bombs
    for (let i = 0; i < bombs; i++) {   // place all the bombs in the begining of the array
        board[Math.floor(i / col)][i % col].value = 'X';
    }

    for (let i = 0; i < bombs; i++) {
        let r = randomNum(0, row * col - 1);  // Get random new index
        let prev_x = Math.floor(i/col);
        let prev_y = i % col;
        let new_x = Math.floor(r/col);
        let new_y = r % col;
            
        if (board[new_x][new_y].value === 0) {   // If the new random spot is available - switch spots
            board[new_x][new_y].value = 'X';
            board[prev_x][prev_y].value = 0;
            mineLocation.push([new_x, new_y]);
        } else {    // If the new random spot is not available - keep it in place
            mineLocation.push([prev_x, prev_y]);
        }
    }

    // Neighbor bombs count
    mineLocation.forEach(element => {
        
        const neighborsOffsets = [
            [-1, -1], [-1, 0], [-1, 1],
            [0 , -1],          [0 , 1],
            [1 , -1], [1 , 0], [1 , 1]
        ];

        neighborsOffsets.forEach(offset => {
            let neighborX = element[0] + offset[0];
            let neighborY = element[1] + offset[1];

            // Check if the neighbor is within the grid boundaries
            if (
                neighborX >= 0 && neighborX < row &&
                neighborY >= 0 && neighborY < col &&
                Number.isInteger(board[neighborX][neighborY].value)
            ) {
                board[neighborX][neighborY].value++; 
                }
        });

    });
  

    return {board, mineLocation};
}

function randomNum(min=0, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}