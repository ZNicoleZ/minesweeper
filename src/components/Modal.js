import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function Modal({restartGame, winGame}) {
    const [render, setRender] = useState(false);
    let endText = "Mission Failed";
    if(winGame){
        endText = "Mission Complete!";
    }
    
    useEffect(() => {
        setTimeout(() => {
        setRender(true);
        }, 1000);
    }, []);

    const handleTryAgainClick = () => {
        setRender(false);
        restartGame();
        // setTimeout(() => {
        //     restartGame();
        // }, 100);
    };

    return (
        <div className="modal"
            style={{
                // opacity: render ? 1 : 0,
                transform: render ? "translateY(0)" : "translateY(-100%)",
            }}
        >
            {winGame && <Confetti />}
            <div id="gameOverTitle">{endText}</div>
            <div className="tryAgain" onClick={() => handleTryAgainClick()}>
                Try Again
            </div>
        </div>
    );
}