import tryFn from './tryFn';

const ASYNCP_UNDEFINED = '__ASYNCP_UNDEFINED__';

export default function reject(collection, predicate) {
    return Promise.all(
        collection.map((item, index, collection) =>
            tryFn(predicate, item, index, collection)
                .then(result => result === true ? ASYNCP_UNDEFINED : item)
        )
    )
        .then(results => results.filter(item => item != ASYNCP_UNDEFINED));
};
