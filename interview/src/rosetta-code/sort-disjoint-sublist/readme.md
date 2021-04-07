# Sort disjoint sublist

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/sort-disjoint-sublist)

Given a list of values and a set of integer indices into that value list, the
task is to sort the values at the given indices, but preserving the values at
indices outside the set of those to be sorted.

Make your function work with the following list of values and set of indices:

`values: [7, **6**, 5, 4, 3, 2, **1**, **0**]`

```js
indices(0-based): {6, 1, 7}
```

Where the correct result would be:

`[7, **0**, 5, 4, 3, 2, **1**, **6**]`.
