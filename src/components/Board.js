import React, { useEffect, useState } from "react";
import createBoard from "../util/createBoard";
import Cell from "./Cell";
import { revealed } from "../util/reveal";
import Modal from "./Modal";
import Timer from "./Timer";

const Board = () => {
    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocations, setMinelocations] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameReset, setGameReset] = useState(false);
    const [flagCount, setFlagCount] = useState(0);
    const [winGame, setWinGame] = useState(false);
    const [showBomb, setShowBomb] = useState(false);
    const rows = 10, cols = 17, bombs = Math.floor(rows*cols/7);

    // ComponentDidMount
    useEffect(() => {

        // Create board
        freshBoard();

    }, []);

    const freshBoard = () => {
        const newBoard = createBoard(rows, cols, bombs);
        setNonMineCount(rows*cols - bombs);
        setMinelocations(newBoard.mineLocation);
        setGrid(newBoard.board);
        setFlagCount(bombs);
    }

    const restartGame = () => {
        // freshBoard();
        // setGameReset(true);
        // setWinGame(false);
        // setGameOver(false);

        freshBoard();

        setTimeout(() => {
            // freshBoard();
            setGameReset(true);
            setWinGame(false);   
            setGameOver(false);         
        }, 1000);

        setTimeout(() => {
            setGameReset(false);
            
        }, 1500);
    }

    // On Right Click - Flag Cell
    const updateFlag = (e, x, y) => {
        
        // disable drop down menu on right click
        e.preventDefault(); 

        // deep copy of a state
        let newGgrid = JSON.parse(JSON.stringify(grid));

        let currFlag = flagCount;

        if(newGgrid[x][y].flagged === true){
            newGgrid[x][y].flagged = false;
            currFlag++;
            setFlagCount(currFlag);
        } else {
            if(!newGgrid[x][y].revealed && flagCount>0){
                newGgrid[x][y].flagged = true;
                currFlag--;
                setFlagCount(currFlag);
            }else if(flagCount===0){
                alert("You have used all of your flags... Try to unflag a spot.")
            }
        }
        
        setGrid(newGgrid);
    }

    // On Left Click - Reveal Cell
    const revealCell = (x,y) => {

        if(grid[x][y].revealed === true || grid[x][y].flagged === true || gameOver){
            return;
        }

        // deep copy of a state
        let newGgrid = JSON.parse(JSON.stringify(grid));
        
        if(newGgrid[x][y].value === 'X'){
            for(let i=0; i<mineLocations.length; i++){
                newGgrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
            }
            setGrid(newGgrid);
            setGameOver(true);
            setWinGame(false);

        }else{
            let newRevealedBoard = revealed(newGgrid, x, y, nonMineCount);
            setGrid(newRevealedBoard.arr);
            setNonMineCount(newRevealedBoard.newNonMinesCount);
            if(newRevealedBoard.newNonMinesCount === 0){
                setGameOver(true);
                setWinGame(true);
            }
        }
    }

    return (
        <div className="gameContainer">
            {gameOver && <Modal restartGame={restartGame} winGame={winGame}/>}
            <div className="gameBoard">
                <div className="gameStatus">
                    <div >🚩  {flagCount}</div>
                    <Timer gameOver={gameOver} gameReset={gameReset}/>
                </div>
                <div className="gameGridContainer">
                    <div className="gameGrid">
                        {grid.map((singleRow, index1) => {
                                return(
                                    <div className="gameGridRow" 
                                    key={index1}>
                                        {singleRow.map((singleBlock, index2) => {
                                            return (
                                                <Cell 
                                                details={singleBlock} 
                                                revealCell={revealCell} 
                                                updateFlag={updateFlag} 
                                                key={index2}
                                                />
                                            );
                                        })}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className="instructions">
                <div className="instrContainer">
                    <div className="left-sentence">Left Click to Reveal</div>
                    <div className="planet"><b>Help</b></div>
                    <div className="right-sentence">Right Click to Flag</div>
                </div>
                <div className="description">
                            <div className="missionTitle">
                                <b>Our mission is to save the Space Expedition!</b>
                            </div>
                            <div className="missionDescription">
                                After crashing on an uncharted planet, our crew needs to watch their steps. 
                                Help us to navigate the treacherous terrain and ensure our survival. 
                                We must use advanced detection technology to uncover hidden dangers — 
                                unseen landmines that could spell disaster for the crew and our mission. 
                                It's a race against time to clear the path and secure our journey through the cosmos.
                            </div>
                </div>
            </div>
        </div>
    )
};

export default Board;