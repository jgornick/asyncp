import detectSeries from './detectSeries';

const NOT_FOUND = '__ASYNCP_NOT_FOUND__'

export default function someSeries(collection, predicate) {
    return detectSeries(collection, predicate, NOT_FOUND)
        .then((result) => result !== NOT_FOUND);
};
