import PromiseBreak from './promiseBreak';
import PromiseTimeoutError from './promiseTimeoutError';
import WaterfallError from './waterfallError';

import applyEach from './applyEach';
import applyEachSeries from './applyEachSeries';
import compose from './compose';
import concat from './concat';
import concatSeries from './concatSeries';
import delay from './delay';
import detect from './detect';
import detectLimit from './detectLimit';
import detectSeries from './detectSeries';
import doDuring from './doDuring';
import doUntil from './doUntil';
import doWhilst from './doWhilst';
import during from './during';
import each from './each';
import eachLimit from './eachLimit';
import eachOf from './eachOf';
import eachOfLimit from './eachOfLimit';
import eachOfSeries from './eachOfSeries';
import eachSeries from './eachSeries';
import every from './every';
import everyLimit from './everyLimit';
import everySeries from './everySeries';
import filter from './filter';
import filterLimit from './filterLimit';
import filterSeries from './filterSeries';
import forever from './forever';
import liftFn from './liftFn';
import map from './map';
import mapLimit from './mapLimit';
import mapSeries from './mapSeries';
import parallel from './parallel';
import parallelLimit from './parallelLimit';
import reduce from './reduce';
import reduceRight from './reduceRight';
import reject from './reject';
import rejectLimit from './rejectLimit';
import rejectSeries from './rejectSeries';
import retry from './retry';
import retryable from './retryable';
import seq from './seq';
import series from './series';
import some from './some';
import someLimit from './someLimit';
import someSeries from './someSeries';
import sortBy from './sortBy';
import timeout from './timeout';
import times from './times';
import timesLimit from './timesLimit';
import timesSeries from './timesSeries';
import tryFn from './tryFn';
import until from './until';
import waterfall from './waterfall';
import whilst from './whilst';

export default {
    PromiseBreak,
    PromiseTimeoutError,
    WaterfallError,

    applyEach,
    applyEachSeries,
    compose,
    concat,
    concatSeries,
    delay,
    detect,
    detectLimit,
    detectSeries,
    doDuring,
    doUntil,
    doWhilst,
    during,
    each,
    eachLimit,
    eachOf,
    eachOfLimit,
    eachOfSeries,
    eachSeries,
    every,
    everyLimit,
    everySeries,
    filter,
    filterLimit,
    filterSeries,
    forever,
    liftFn,
    map,
    mapLimit,
    mapSeries,
    parallel,
    parallelLimit,
    reduce,
    reduceRight,
    reject,
    rejectLimit,
    rejectSeries,
    retry,
    retryable,
    seq,
    series,
    some,
    someLimit,
    someSeries,
    sortBy,
    timeout,
    times,
    timesLimit,
    timesSeries,
    tryFn,
    until,
    waterfall,
    whilst,

    // aliases
    all: every,
    allLimit: everyLimit,
    allSeries: everySeries,
    any: some,
    find: detect,
    findLimit: detectLimit,
    findSeries: detectSeries,
    forEach: each,
    forEachSeries: eachSeries,
    forEachLimit: eachLimit,
    forEachOf: eachOf,
    forEachOfSeries: eachOfSeries,
    forEachOfLimit: eachOfLimit,
    inject: reduce,
    foldl: reduce,
    foldr: reduceRight,
    select: filter,
    selectLimit: filterLimit,
    selectSeries: filterSeries
};
