
import { useState } from "react";

const Box = ({ value }) => (
    <div className="p-4 h-full w-full h-32 border rounded-xl bg-slate-500">
        <p className="text-white text-center text-5xl">{value ? value : ''}</p>
    </div>
);

let initialMap = Array(16).fill(0);

// random int de 1 a max
const randomInt = (max) => Math.floor(Math.random() * max) + 1;
// element random d'una llista donada
const randomOf = (arr) => arr[Math.floor(Math.random() * arr.length)]
// retorna llista d'indexos lliures (value == 0)
const freePositions = arr => arr.map((e, i) => e ? 0 : i).filter(e => e);

initialMap[randomOf(freePositions(initialMap))] = 2;
initialMap[randomOf(freePositions(initialMap))] = 2;
initialMap[randomOf(freePositions(initialMap))] = 2;
initialMap[randomOf(freePositions(initialMap))] = 2;
initialMap[randomOf(freePositions(initialMap))] = 2;

export default () => {


    const [map, setMap] = useState(initialMap);

    // mou tot amunt una fila
    const up = () => {
        // desem posicions inicials
        const [i1, i2, i3, i4, ii1, ii2, ii3, ii4, ...resta] = map;
        const nouMap = [i1 + ii1, i2 + ii2, i3 + ii3, i4 + ii4, ...resta, 0, 0, 0, 0]
        setMap(nouMap)

    }
    const left = () => { }
    const right = () => { }
    const down = () => { }


    return (
        <>
            <div className="w-1/2 m-auto grid gap-8 grid-cols-4">
                {map.map((e, i) => <Box key={i} value={e} />)}
      
                <button className="w-full bg-slate-300 rounded-xl h-20 flex justify-center items-center" onClick={left}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M11 17h6l-4 -5l4 -5h-6l-4 5z" />
                    </svg>
                </button>
                <button className="w-full bg-slate-300 rounded-xl h-20 flex justify-center items-center" onClick={up}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-up" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 11v6l-5 -4l-5 4v-6l5 -4z" />
                    </svg>
                </button>
                <button className="w-full bg-slate-300 rounded-xl h-20 flex justify-center items-center" onClick={down}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-down" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 13v-6l-5 4l-5 -4v6l5 4z" />
                    </svg>

                </button>
                <button className="w-full bg-slate-300 rounded-xl h-20 flex justify-center items-center" onClick={right}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-badge-right" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M13 7h-6l4 5l-4 5h6l4 -5z" />
                    </svg>
                </button>
            </div>
        </>
    )
}

