export default function isPlainObject(obj) {
    return (
        typeof obj === 'object'
        && obj !== null
        && obj.constructor === Object
        && Object.prototype.toString.call(obj) === '[object Object]'
    );
}
