import PromiseTimeoutError from './promiseTimeoutError';

export default function delay(time, message = 'Promise timed out.') {
    return new Promise(
        (resolve, reject) => setTimeout(
            reject.bind(null, new PromiseTimeoutError(message)),
            time
        )
    );
};