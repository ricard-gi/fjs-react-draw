
import { useState } from "react";
import DirectionButton from "./DirectionButton";
import Box from "./Box";
import { zeros, randomOf, freePositions, addRandomItem, arraysIguals, getColumn, getRow, setColumn, setRow, processArray } from './helpers';

// tailwind: grid-cols-3 grid-cols-4 grid-cols-5
// ample/alt del grid
const SIZE = 5;

//mapa inicial. array de SIZE*SIZE zeros
let initialMap = zeros(SIZE * SIZE);

//afegim dos primers randoms
addRandomItem(initialMap, 2)
addRandomItem(initialMap, 2)



export default () => {

    const [mapa, setMapa] = useState(initialMap);
    const [gameOver, setGameOver] = useState(false);
    const [lastMove, setLastMove] = useState('')

    //direction: up, down, left, right
    const move = (direction) => {
        let col, reverse;
        if (direction==='up') {
            col=true;
            reverse=false;
        }
        if (direction==='down') {
            col=true;
            reverse=true;
        }
        if (direction==='left') {
            col=false;
            reverse=false;
        }
        if (direction==='right') {
            col=false;
            reverse=true;
        }

        const nouMap = [...mapa];

        zeros(SIZE).forEach((e, i) => {
            let vector = col ? getColumn(SIZE, nouMap, i) : getRow(SIZE, nouMap, i);
            //console.log(vector)
            vector = processArray(SIZE, vector, reverse)
            if (col) setColumn(SIZE, nouMap, i, vector); else setRow(SIZE, nouMap, i, vector);
        })

        const frees = freePositions(nouMap);
        if (frees.length) {
            nouMap[randomOf(frees)] = 2;
        } else {
            //només considerem que estem a gameover si no ha caviat res des de l'última jugada
            // i el moviment col és el mateix que l'anterior...
            if (arraysIguals(nouMap, mapa) && lastMove!==col) setGameOver(true)
        }
        setLastMove(col)
        setMapa(nouMap)
    }


    return (
        <>
            <br />
            <div className={`w-1/2 m-auto grid gap-8 grid-cols-${SIZE}`}>
                {mapa.map((e, i) => <Box key={i} value={e} />)}
            </div>
            <br />
            <div className={`w-1/2 m-auto grid gap-8 grid-cols-4`}>
                {
                    ["up", "left", "right", "down"].map((dir,idx) => <DirectionButton disabled={gameOver} direction={dir} key={idx} action={()=>move(dir)} />)
                }
            </div>
            <br />
            {gameOver ? <h1 className="text-red-700 text-5xl text-center" >GAME OVER</h1> : <h1></h1>}
            <br />
        </>
    )
}

