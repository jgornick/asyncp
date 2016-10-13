import detect from './detect';
import promised from './promised';

const NOT_FOUND = '__ASYNCP_NOT_FOUND__';

export default promised(function some(collection, predicate) {
    return detect(collection, predicate, NOT_FOUND)
        .then((result) => result !== NOT_FOUND);
});
