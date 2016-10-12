import detectSeries from './detectSeries';
import promised from './promised';

const NOT_FOUND = '__ASYNCP_NOT_FOUND__'

export default promised(function someSeries(collection, predicate) {
    return detectSeries(collection, predicate, NOT_FOUND)
        .then((result) => result !== NOT_FOUND);
});
