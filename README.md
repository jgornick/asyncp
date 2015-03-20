# Async.js to the Promise Land

The following is an exercise that will translate the methods in the Async.js API to use Promises.

## Collections

### each(arr, iterator, callback)

```
async.each(openFiles, saveFile, function(err) {});
```

#### Promise

```
Promise.all(openFiles.map((file) => {
    return saveFile(file);
}))
    .then(() => {})
    .catch((error) => {});
```

#### When

```
when.map(openFiles, saveFile)
    .then(() => {})
    .catch((error) => {});
```

### eachSeries(arr, iterator, callback)

```
async.eachSeries(openFiles, saveFile, function(err) {});
```

#### Promise

```
openFiles.reduce(
    (promise, file) => {
        return promise.then(saveFile.bind(null, file));
    },
    Promise.resolve()
)
    .then(() => {})
    .catch(error) => {});
```

#### When

```
openFiles.reduce(
    (promise, file) => {
        console.log('reduce', file, promise);
        return promise.then(saveFile.bind(null, file));
    },
    when.resolve()
)
    .then(() => {})
    .catch(error) => {});
```

### eachLimit(arr, limit, iterator, callback)

```
async.each(openFiles, 2, saveFile, function(err) {});
```

#### Promise

In order to limit the number of concurrent tasks, we're using an external library called throat.

```
Promise.all(openFiles.map(throat(2, (file) => {
    return saveFile(file);
})))
    .then(() => {})
    .catch((error) => {});
```

#### When

When.js ships with a concurrency limitation utility called guard.

```
when.map(openFiles, whenGuard(whenGuard(2), saveFile))
    .then(() => {})
    .catch((error) => {});
```
