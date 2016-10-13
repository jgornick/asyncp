import detectLimit from './detectLimit';
import promised from './promised';

const NOT_FOUND = '__ASYNCP_NOT_FOUND__'

export default promised(function someLimit(collection, limit, predicate) {
    return detectLimit(collection, limit, predicate, NOT_FOUND)
        .then((result) => result !== NOT_FOUND);
});
