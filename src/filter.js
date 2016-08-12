import tryFn from './tryFn';

const ASYNCP_UNDEFINED = '__ASYNCP_UNDEFINED__';

export default function filter(collection, predicate) {
    return Promise.all(
        collection.map((item, index, collection) =>
            tryFn(predicate, item, index, collection)
                .then(result => result === true ? item : ASYNCP_UNDEFINED)
        )
    )
        .then(results => results.filter(item => item != ASYNCP_UNDEFINED));
};
