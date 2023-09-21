import { useEffect, useState } from "react";

export default function Timer({gameOver, gameReset}){
    // let [time, setTime] = useState(0);

    // useEffect(() => {
    //     function incrementTime(){
    //         setTimeout(() => {
    //             let newTime = time;
    //             if(!gameOver){
    //                 newTime = time + 1;
    //             }
    //             setTime(newTime);
    //         }, 1000)
    //     }
    //         incrementTime();
    // }, [time]);

    const [isActive, setIsActive] = useState(true);
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (!gameOver && isActive) {
            const timerInterval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);

            return () => {
                clearInterval(timerInterval);
            };
        } else if (gameOver) {
            setIsActive(false);
        }
    }, [gameOver, isActive]);

    useEffect(() => {
        if (gameReset) {
            setIsActive(true);
            setTime(0);
        }
    }, [gameReset]);

    const startTimer = () => {
        setIsActive(true);
    };

    return (
        // <div>⏰  {Math.floor(time/60)}:{time%60}</div>
        <div>
            ⏰ {String(Math.floor(time / 60)).padStart(2, '0')}:{(time % 60).toString().padStart(2, '0')}
        </div>
    );
}

