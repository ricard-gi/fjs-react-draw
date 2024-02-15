

// retorna array de n zeros
const zeros = (n) => Array(n).fill(0);



// retorna element random d'una llista donadsa
const randomOf = (arr) => arr[Math.floor(Math.random() * arr.length)]

// retorna llista d'indexos lliures (value == 0)
const freePositions = arr => arr.map((e, i) => e ? 0 : i).filter(e => e);

const addRandomItem = (theMap, value) => {
    console.log(theMap)
    if (!freePositions.length) return false;
    theMap[randomOf(freePositions(theMap))] = value;
    return true;
}

export { zeros, randomOf, freePositions, addRandomItem }