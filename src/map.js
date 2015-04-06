import each from './each';

export default function map(collection, iterator) {
    return each(collection, iterator);
};