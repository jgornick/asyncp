import whilst from './whilst';

export default function during(condition, task, accumulator) {
    return whilst(condition, task, accumulator);
};