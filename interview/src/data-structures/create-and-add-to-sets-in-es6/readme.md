# Create and Add to Sets in ES6

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/create-and-add-to-sets-in-es6)

Now that you have worked through ES5, you are going to perform something similar
in ES6. This will be considerably easier. ES6 contains a built-in data structure
`Set` so many of the operations you wrote by hand are now included for you.
Let's take a look:

To create a new empty set:

```js
var set = new Set();
```

You can create a set with a value:

```js
var set = new Set(1);
```

You can create a set with an array:

```js
var set = new Set([1, 2, 3]);
```

Once you have created a set, you can add the values you wish using the `add`
method:

```js
var set = new Set([1, 2, 3]);
set.add([4, 5, 6]);
```

As a reminder, a set is a data structure that cannot contain duplicate values:

```js
var set = new Set([1, 2, 3, 1, 2, 3]);
// set contains [1, 2, 3] only
```
