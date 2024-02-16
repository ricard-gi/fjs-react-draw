import { useState } from 'react';
import AdrPointer from './AdrPointer';

const defaultPlace = {
  "adr": "Girona",
  "lat": 41.99103588081312,
  "long": 2.8248757123947144
}

export default () => {

  const [address, setAddress] = useState(null);
  const [place, setPlace] = useState(defaultPlace);

  return (
    <>
      <AdrPointer adrState={[address, setAddress]} placeState={[place, setPlace]} />
    </>
  )
}