import eachLimit from './eachLimit';

export default function mapLimit(collection, iteratee) {
    return eachLimit(collection, iteratee);
};