# Use .has and .size on an ES6 Set

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/use--has-and--size-on-an-es6-set)

Let's look at the .has and .size methods available on the ES6 Set object.

First, create an ES6 Set

```js
var set = new Set([1, 2, 3]);
```

The .has method will check if the value is contained within the set.

```js
var hasTwo = set.has(2);
```

The .size method will return an integer representing the size of the Set

```js
var howBig = set.size;
```
