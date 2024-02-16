import React, { useEffect, useState } from 'react';

const formata = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

export default () => {
    const [secs, setSecs] = useState(0);
    const [play, setPlay] = useState(true)
    useEffect(() => {
        let interval;
        if(play){
            interval = setInterval(()=>setSecs(secs+1), 1000)
        }else{
            clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [ secs,play]);
    return (
        <>
            <h1 className={`${play ? "text-green-500" : "text-red-500"} text-2xl`}>{formata(secs)}</h1>
            <br />
            <button className="border p-4 bg-green-300" onClick={() => setPlay(!play)}>Start/Stop</button>
        </>
    )
}
