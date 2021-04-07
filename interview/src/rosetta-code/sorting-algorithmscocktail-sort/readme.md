# Sorting algorithms/Cocktail sort

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/sorting-algorithmscocktail-sort)

The cocktail shaker sort is an improvement on the
[Bubble Sort](https://rosettacode.org/wiki/Bubble%20Sort). The improvement is
basically that values "bubble" both directions through the array, because on
each iteration the cocktail shaker sort bubble sorts once forwards and once
backwards. Pseudocode for the algorithm (from
[wikipedia](https://en.wikipedia.org/wiki/Cocktail%20sort)):

**function** _cocktailSort_( A : list of sortable items ) **do** swapped :=
false **for each** i **in** 0 **to** length( A ) - 2 **do** **if** A\[ i \] >
A\[ i+1 \] **then** _// test whether the two_ _// elements are in the wrong_ _//
order_ swap( A\[ i \], A\[ i+1 \] ) _// let the two elements_ _// change places_
swapped := true; **if** swapped = false **then** _// we can exit the outer loop
here if no swaps occurred._ **break do-while loop**; swapped := false **for
each** i **in** length( A ) - 2 **down to** 0 **do** **if** A\[ i \] > A\[ i+1
\] **then** swap( A\[ i \], A\[ i+1 \] ) swapped := true; **while** swapped; _//
if no elements have been swapped,_ _// then the list is sorted_
