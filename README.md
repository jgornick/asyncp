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
    (promise, file) => {
        return promise
            .then(saveFile.bind(null, file))
            .then((result) => {
                results.push(result);
                return Promise.resolve(results);
            });
    },
    Promise.resolve()
)
    .then((results) => {})
    .catch(error) => {});
```

#### When

When includes a utility called sequence that runs an array of tasks in order.

```
whenSequence(openFiles.map((file) => {
    return saveFile(file);
}))
    .then((results) => {})
    .catch(error) => {});
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
    .then((results) => {
        return openFiles
            .map((file, index) => results[index] ? file : undefined)
            .filter((file) => file != undefined);
    })
    .then((results) => {})
    .catch((error) => {});
```

#### When

```
when.filter(openFiles, exists)
    .then((results) => {})
    .catch((error) => {});
```