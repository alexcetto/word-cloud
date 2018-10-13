

export function addToMap(myMap, myArray) {
    for (let i=0; i < myArray.length; i++) {
        const key = trimWords(myArray[i])
        let previousValue = myMap.get(key);
        if (previousValue === undefined) {
            previousValue = 0;
        }
        myMap.set(key, previousValue+1);
    }
    return myMap;
}


export const trimWords = (word) => {
    return String(word).replace(/^\s+|\s+$/g, '');
};
