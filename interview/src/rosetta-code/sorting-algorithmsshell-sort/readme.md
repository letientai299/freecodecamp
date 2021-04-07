# Sorting algorithms/Shell sort

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/sorting-algorithmsshell-sort)

Write a function to sort an array of elements using the
[Shell sort](https://en.wikipedia.org/wiki/Shell%20sort) algorithm, a
diminishing increment sort. The function should return the sorted array.

The Shell sort (also known as Shellsort or Shell's method) is named after its
inventor, Donald Shell, who published the algorithm in 1959.

Shell sort is a sequence of interleaved insertion sorts based on an increment
sequence. The increment size is reduced after each pass until the increment size
is 1.

With an increment size of 1, the sort is a basic insertion sort, but by this
time the data is guaranteed to be almost sorted, which is insertion sort's "best
case".

Any sequence will sort the data as long as it ends in 1, but some work better
than others.

Empirical studies have shown a geometric increment sequence with a ratio of
about 2.2 work well in practice.
