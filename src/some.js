import detect from './detect';

const NOT_FOUND = '__ASYNCP_NOT_FOUND__';

export default function some(collection, predicate) {
    return detect(collection, predicate, NOT_FOUND)
        .then((result) => result !== NOT_FOUND);
};