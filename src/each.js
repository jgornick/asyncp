export default function each(collection, iterator) {
    return Promise.all(collection.map(iterator));
};