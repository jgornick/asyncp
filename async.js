import PromiseBreak from './src/promiseBreak';
import WaterfallError from './src/waterfallError';

import compose from './src/compose';
import concat from './src/concat';
import concatSeries from './src/concatSeries';
import detect from './src/detect';
import detectSeries from './src/detectSeries';
import doUntil from './src/doUntil';
import doWhilst from './src/doWhilst';
import each from './src/each';
import eachLimit from './src/eachLimit';
import eachSeries from './src/eachSeries';
import every from './src/every';
import filter from './src/filter';
import filterSeries from './src/filterSeries';
import forever from './src/forever';
import liftFn from './src/liftFn';
import map from './src/map';
import mapSeries from './src/mapSeries';
import mapSeriesLimit from './src/mapSeriesLimit';
import parallel from './src/parallel';
import parallelLimit from './src/parallelLimit';
import reduce from './src/reduce';
import reduceRight from './src/reduceRight';
import reject from './src/reject';
import rejectSeries from './src/rejectSeries';
import retry from './src/retry';
import seq from './src/seq';
import series from './src/series';
import some from './src/some';
import sortBy from './src/sortBy';
import times from './src/times';
import timesSeries from './src/timesSeries';
import tryFn from './src/tryFn';
import until from './src/until';
import waterfall from './src/waterfall';
import whilst from './src/whilst';

export default {
    PromiseBreak,
    WaterfallError,

    compose,
    concat,
    concatSeries,
    detect,
    detectSeries,
    doUntil,
    doWhilst,
    each,
    eachLimit,
    eachSeries,
    every,
    filter,
    filterSeries,
    forever,
    liftFn,
    map,
    mapSeries,
    mapSeriesLimit,
    parallel,
    parallelLimit,
    reduce,
    reduceRight,
    reject,
    rejectSeries,
    retry,
    seq,
    series,
    some,
    sortBy,
    times,
    timesSeries,
    tryFn,
    until,
    waterfall,
    whilst
};