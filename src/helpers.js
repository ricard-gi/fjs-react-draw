

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


const arraysIguals = (arr1, arr2) => arr1.length==arr2.length && arr1.every((e,i) => e==arr2[i] )

// arr pot ser 4x4, 5x5...
const getColumn = (SIZE, arr, n) => zeros(SIZE).map((e, i) => arr[n + SIZE * i])
const setColumn = (SIZE, arr, n, values) => {
    zeros(SIZE).forEach((e, i) => {
        arr[n + SIZE * i] = values[i];
    })
}

const getRow = (SIZE, arr, n) => zeros(SIZE).map((e, i) => arr[n * SIZE + i])
const setRow = (SIZE, arr, n, values) => {
    zeros(SIZE).forEach((e, i) => {
        arr[n * SIZE + i] = values[i];
    })
}



//funció que calcula la cosa
// reb un vector tipus: [2,0,2,0,8,4]
// depenent de reverse retorna: [4,8,4,0,0,0] o [0,0,0,4,8,4]
// elimina zeros, suma iguals
const processArray = (SIZE, values, reverse) => {
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



export { zeros, randomOf, freePositions, addRandomItem, arraysIguals, getColumn, getRow, setColumn, setRow, processArray }