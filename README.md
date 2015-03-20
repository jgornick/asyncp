# Async.js to the Promise Land

The following is an exercise that will translate the methods in the Async.js API to use Promises.

## Collections

### each(arr, iterator, callback)

```
async.each(openFiles, saveFile, function(err) {});
```

#### Promise

```
Promise.all(openFiles.map(saveFile))
    .then((results) => {})
    .catch((error) => {});
```

#### When

```
when.all(openFiles.map(saveFile))
    .then((results) => {})
    .catch((error) => {});
```

### eachSeries(arr, iterator, callback)

```
async.eachSeries(openFiles, saveFile, function(err) {});
```

#### Promise

```
let results = [];

openFiles.reduce(
    (promise, file) => promise.then((results) => {
        return saveFile(file)
            .then((result) => {
                results.push(result);
                return results;
            });
    }),
    Promise.resolve([])
)
    .then((results) => {})
    .catch(error) => {});
```

#### When

```
when.reduce(openFiles, (results, file) => {
    return saveFile(file)
        .then((result) => {
                results.push(result);
                return results;
            });
}, [])
```

### eachLimit(arr, limit, iterator, callback)

```
async.eachLimit(openFiles, 2, saveFile, function(err) {});
```

#### Promise

In order to limit the number of concurrent tasks, we're using an external library called throat.

```
Promise.all(openFiles.map(throat(2, saveFile)))
    .then((results) => {})
    .catch((error) => {});
```

#### When

When.js ships with a concurrency limitation utility called guard.

```
when.all(openFiles.map(guard(guard.n(2), saveFile)))
    .then((results) => {})
    .catch((error) => {});
```

### map(arr, iterator, callback)

```
async.map(openFiles, saveFile, function(err, results) {});
```

Because the each* implementations return results in the resolved promise, all map* methods map to each*.

### mapSeries(arr, iterator, callback)

```
async.mapSeries(openFiles, saveFile, function(err, results) {});
```

Because the each* implementations return results in the resolved promise, all map* methods map to each*.

### mapLimit(arr, iterator, callback)

```
async.mapLimit(openFiles, 2, saveFile, function(err, results) {});
```

Because the each\* implementations return results in the resolved promise, all map* methods map to each*.

### filter(arr, iterator, callback)

```
async.filter(openFiles, exists, function(err, results) {});
```

#### Promise

```
Promise.all(openFiles.map(exists))
    .then((results) => openFiles.filter((file, index) => results[index]))
    .then((results) => {})
    .catch((error) => {});
```

#### When

```
when.filter(openFiles, exists)
    .then((results) => {})
    .catch((error) => {});
```

### filterSeries(arr, iterator, callback)

```
async.filterSeries(openFiles, exists, function(err, results) {});
```

#### Promise

```
openFiles.reduce(
    (promise, file) => promise.then((results) => {
        return exists(file)
            .then((result) => {
                if (result) {
                    results.push(file);
                }
                return results;
            });
    }),
    Promise.resolve([])
)
    .then((results) => {})
    .catch((error) => {});
```

#### When

```
when.reduce(openFiles, (results, file) => {
    return exists(file)
        .then((result) => {
                if (result) {
                    results.push(file);
                }

                return results;
            });
}, [])
    .then((results) => {})
    .catch((error) => {});
```

### reject(arr, iterator, callback)

```
async.reject(openFiles, exists, function(err, results) {});
```

#### Promise

```
Promise.all(openFiles.map(exists))
    .then((results) => openFiles.filter((file, index) => !results[index]))
    .then((results) => {})
    .catch((error) => {});
```

#### When

```
when.filter(openFiles, (...args) => when(exists(...args), (result) => !result))
    .then((results) => {})
    .catch((error) => {});
```

### rejectSeries(arr, iterator, callback)

```
async.rejectSeries(openFiles, exists, function(err, results) {});
```

#### Promise

```
openFiles.reduce(
    (promise, file) => promise.then((results) => {
        return exists(file)
            .then((result) => {
                if (!result) {
                    results.push(file);
                }
                return results;
            });
    }),
    Promise.resolve([])
)
    .then((results) => {})
    .catch((error) => {});
```

#### When

```
when.reduce(openFiles, (results, file) => {
    return exists(file)
        .then((result) => {
                if (!result) {
                    results.push(file);
                }

                return results;
            });
}, [])
    .then((results) => {})
    .catch((error) => {});
```

### reduce(arr, memo, iterator, callback)
### reduceRight(arr, memo, iterator, callback)

```
async.reduce(openFiles, 0, inc, function(err, result) {});
async.reduceRight(openFiles, 0, inc, function(err, result) {});
```

#### Promise

```
openFiles.reduce(
    (promise, file) => promise.then((result) => inc(result, file)),
    Promise.resolve(0)
)
    .then((result) => {})
    .catch((error) => {});
```

#### When

```
when.reduce(openFiles, inc, 0)
    .then((result) => {})
    .catch((error) => {});
```
