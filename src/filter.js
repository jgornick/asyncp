import each from './each';

export default function filter(collection, predicate) {
    return each(collection, predicate)
        .then((results) => collection.filter((item, index) => results[index]));
};