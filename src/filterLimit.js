import eachLimit from './eachLimit';

export default function filterLimit(collection, limit, predicate) {
    return eachLimit(collection, limit, predicate)
        .then((results) => collection.filter((item, index) => results[index]));
};