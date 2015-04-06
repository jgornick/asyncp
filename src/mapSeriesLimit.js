import eachLimit from './eachLimit';

export default function mapSeriesLimit(collection, iterator) {
    return eachLimit(collection, iterator);
};