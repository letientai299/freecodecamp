# Remove items from a set in ES6

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/remove-items-from-a-set-in-es6)

Let's practice removing items from an ES6 Set using the `delete` method.

First, create an ES6 Set:

```js
var set = new Set([1, 2, 3]);
```

Now remove an item from your Set with the `delete` method.

```js
set.delete(1);
console.log([...set]); // should return [ 2, 3 ]
```
