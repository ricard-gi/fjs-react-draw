
import { useState } from "react";
import DirectionButton from "./DirectionButton";
import Box from "./Box";
import { zeros, randomOf, freePositions, addRandomItem, arraysIguals } from './helpers';

// tailwind: grid-cols-3 grid-cols-4 grid-cols-5
// ample/alt del grid
const SIZE = 3;

//mapa inicial. array de SIZE*SIZE zeros
let initialMap = zeros(SIZE * SIZE);

//afegim dos primers randoms
addRandomItem(initialMap, 2)
addRandomItem(initialMap, 2)


// arr pot ser 4x4, 5x5...
const getColumn = (arr, n) => zeros(SIZE).map((e, i) => arr[n + SIZE * i])
const setColumn = (arr, n, values) => {
    zeros(SIZE).forEach((e, i) => {
        arr[n + SIZE * i] = values[i];
    })
}

const getRow = (arr, n) => zeros(SIZE).map((e, i) => arr[n * SIZE + i])
const setRow = (arr, n, values) => {
    zeros(SIZE).forEach((e, i) => {
        arr[n * SIZE + i] = values[i];
    })
}

//funció que calcula la cosa
// reb un vector tipus: [2,0,2,0,8,4]
// depenent de reverse retorna: [4,8,4,0,0,0] o [0,0,0,4,8,4]
// elimina zeros, suma iguals
const processArray = (values, reverse) => {

    // creem nova array, eliminant 0s
    let newValues = values.filter(e => e);

    // si no queda res, retornem buida
    if (!newValues.length) return zeros(SIZE)

    if (reverse) newValues = newValues.reverse();

    let vector = [];
    for (let i = 0; i < SIZE; i++) {
        // mirem si dos valors coincidents, només si no som a l'últim de la fila
        if (i<SIZE && newValues[i] == newValues[i + 1]) {
            // si sí, els sumem i ens saltem la següent iteració
            vector.push(newValues[i] * 2)
            i++
        } else {
            // si no, impulsem valor actual
            vector.push(newValues[i])
        }
    }
    const zeroFill = zeros(SIZE - vector.length)
    vector = [...vector, ...zeroFill]
    //retornem vector o revers, depenent
    return reverse ? vector.reverse() : vector;

}



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
            let vector = col ? getColumn(nouMap, i) : getRow(nouMap, i);
            console.log(vector)
            vector = processArray(vector, reverse)
            if (col) setColumn(nouMap, i, vector); else setRow(nouMap, i, vector);
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

