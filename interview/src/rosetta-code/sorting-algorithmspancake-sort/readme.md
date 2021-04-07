# Sorting algorithms/Pancake sort

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/sorting-algorithmspancake-sort)

Write a function to sort an array of integers (of any convenient size) into
ascending order using
[Pancake sorting](https://en.wikipedia.org/wiki/Pancake%20sorting). The function
should return the sorted array.

In short, instead of individual elements being sorted, the only operation
allowed is to "flip" one end of the list, like so:

Before: **6 7 8 9** 2 5 3 4 1

After: **9 8 7 6** 2 5 3 4 1

Only one end of the list can be flipped; this should be the low end, but the
high end is okay if it's easier to code or works better, but it **must** be the
same end for the entire solution. (The end flipped can't be arbitrarily
changed.)
