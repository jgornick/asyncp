import eachLimit from './eachLimit';

export default function mapSeriesLimit(collection, iteratee) {
    return eachLimit(collection, iteratee);
};