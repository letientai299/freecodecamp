# Use Spread and Notes for ES5 Set() Integration

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/use-spread-and-notes-for-es5-set-integration)

Do you remember the ES6 spread operator `...`?

`...` can take iterable objects in ES6 and turn them into arrays.

Let's create a Set, and check out the spread function.

```js
var set = new Set([1, 2, 3]);
var setToArr = [...set];
console.log(setToArr); // returns [ 1, 2, 3 ]
```
