import detectLimit from './detectLimit';

const NOT_FOUND = '__ASYNCP_NOT_FOUND__'

export default function someLimit(collection, limit, predicate) {
    return detectLimit(collection, limit, predicate, NOT_FOUND)
        .then((result) => result !== NOT_FOUND);
};
