# Sorting algorithms/Stooge sort

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/sorting-algorithmsstooge-sort)

Write a function to perform
[Stooge Sort](https://en.wikipedia.org/wiki/Stooge%20sort) on an array of
integers. The function should return a sorted array.

The Stooge Sort algorithm is as follows:

**algorithm** stoogesort(**array** L, i = 0, j = **length**(L)-1) **if** L\[j\]
< L\[i\] **then** L\[i\] **↔** L\[j\] **if** j - i > 1 **then** t **:=** (j -
i + 1)/3 stoogesort(L, i , j-t) stoogesort(L, i+t, j ) stoogesort(L, i , j-t)
**return** L
