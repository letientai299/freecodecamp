# Sorting algorithms/Bogosort

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/sorting-algorithmsbogosort)

[Bogosort](https://en.wikipedia.org/wiki/Bogosort) a list of numbers.

Bogosort simply shuffles a collection randomly until it is sorted.

"Bogosort" is a perversely inefficient algorithm only used as an in-joke.

Its average run-time is O(n!) because the chance that any given shuffle of a set
will end up in sorted order is about one in _n_ factorial, and the worst case is
infinite since there's no guarantee that a random shuffling will ever produce a
sorted sequence.

Its best case is O(n) since a single pass through the elements may suffice to
order them.

Pseudocode:

**while not** InOrder(list) **do** Shuffle(list) **done**
