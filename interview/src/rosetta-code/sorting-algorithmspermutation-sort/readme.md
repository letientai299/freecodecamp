# Sorting algorithms/Permutation sort

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/sorting-algorithmspermutation-sort)

Write a function to implement a permutation sort, which proceeds by generating
the possible permutations of the input array until discovering the sorted one.
The function should return the sorted array.

Pseudocode:

**while not** InOrder(list) **do** nextPermutation(list) **done**
