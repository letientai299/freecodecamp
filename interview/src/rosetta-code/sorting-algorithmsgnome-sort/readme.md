# Sorting algorithms/Gnome sort

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/sorting-algorithmsgnome-sort)

Gnome sort is a sorting algorithm which is similar to
[Insertion sort](https://rosettacode.org/wiki/Insertion%20sort), except that
moving an element to its proper place is accomplished by a series of swaps, as
in [Bubble Sort](https://rosettacode.org/wiki/Bubble%20Sort).

The pseudocode for the algorithm is:

**function** _gnomeSort_(a\[0..size-1\]) i := 1 j := 2 **while** i < size **do**
**if** a\[i-1\] <= a\[i\] **then** _/// for descending sort, use >= for
comparison_ i := j j := j + 1 **else** **swap** a\[i-1\] **and** a\[i\] i := i -
1 **if** i = 0 **then** i := j j := j + 1 **endif** **endif** **done**
