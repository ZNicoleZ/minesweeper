import React from "react";
import { mineColor } from "../util/mineColor";

export default function Cell({details, updateFlag, revealCell}) {
    
    const cellstyle = {
        background: details.revealed
                ? details.value === 'X'
                    ? mineColor()
                    : bombCheckersPattern(details.x, details.y)
                : checkersPattern(details.x, details.y),
        color: numColorCode(details.value)
    }
    
    return (
        <div 
            onContextMenu={(e) => updateFlag(e, details.x, details.y)} 
            onClick={() => revealCell(details.x, details.y)} 
            style={cellstyle}
            className="cellStyle"
        >
            {details.flagged ? "🚩" : (details.revealed ? (details.value === 0 ? "" : (details.value === 'X'? '💣' : details.value)) : "")}
        </div>
    )
}


const bombCheckersPattern = (x, y) => {
    if((x+y) % 2 === 0) {
        return "#f2cf6f";
    } else {
        return "#edca68";
    }
}

const checkersPattern = (x, y) => {
    if((x+y) % 2 === 0) {
        return "#b1fc26";
    } else {
        return "#c0fc19";
    }
}

const numColorCode = (num) => {
    switch(num){
        case 1:
            return "#845EC2";
        case 2:
            return "#2C73D2";
        case 3:
            return "#0081CF";
        case 4:
            return "#0089BA";
        case 5:
            return "#008E9B";
        default:
            return "#008F7A";
        
    }
}