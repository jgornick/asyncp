export default function each(collection, iteratee) {
    return Promise.all(collection.map(iteratee));
};