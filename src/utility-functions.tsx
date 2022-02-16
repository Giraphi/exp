export function modulo(n: number, m: number) {
    // will deal correctly with negative numbers, unlike the "%" operator
    return ((n % m) + m) % m;
}

export function uniqueAdd(collection: string[], element: string) {
    if (collection.indexOf(element) !== -1) {
        return collection;
    }

    return [...collection, element];
}

export function remove(collection: string[], element: string) {
    if (collection.indexOf(element) === -1) {
        return collection;
    }

    return collection.filter((collectionItem) => collectionItem !== element);
}


export function round(x: number) {
    return Math.round(x * 100) / 100
}

export function getDistanceVector(pointA: [number,number], pointB: [number,number],): [number, number] {
    const x = pointA[0] - pointB[0] ;
    const y = pointA[1] - pointB[1] ;
    return [x,y];
    // return Math.round(Math.sqrt( a*a + b*b ));
}

export function getVectorLength(vector: [number, number]) {
    return Math.sqrt( vector[0] * vector[0] + vector[1] * vector[1]  );
}

export function normalizeVector(vector: [number, number]) {
    const length = getVectorLength(vector);
    return [
        vector[0] / length,
        vector[1] / length
    ]
}
