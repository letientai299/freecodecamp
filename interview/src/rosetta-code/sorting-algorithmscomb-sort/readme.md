# Sorting algorithms/Comb sort

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/sorting-algorithmscomb-sort)

Implement a _comb sort_.

The **Comb Sort** is a variant of the
[Bubble Sort](https://rosettacode.org/wiki/Bubble%20Sort).

Like the [Shell sort](https://rosettacode.org/wiki/Shell%20sort), the Comb Sort
increases the gap used in comparisons and exchanges.

Dividing the gap by $(1-e^{-\\varphi})^{-1} \\approx 1.247330950103979$ works
best, but 1.3 may be more practical.

Some implementations use the insertion sort once the gap is less than a certain
amount.

**Also see**

- the Wikipedia article: [Comb sort](https://en.wikipedia.org/wiki/Comb sort).

Variants:

- Combsort11 makes sure the gap ends in (11, 8, 6, 4, 3, 2, 1), which is
  significantly faster than the other two possible endings.
- Combsort with different endings changes to a more efficient sort when the data
  is almost sorted (when the gap is small). Comb sort with a low gap isn't much
  better than the Bubble Sort.

Pseudocode:

**function** combsort(**array** input) gap := input**.size** _//initialize gap
size_ **loop until** gap = 1 **and** swaps = 0 _//update the gap value for a
next comb. Below is an example_ gap := int(gap / 1.25) **if** gap < 1 _//minimum
gap is 1_ gap := 1 **end if** i := 0 swaps := 0 _//see
[Bubble Sort](https://rosettacode.org/wiki/Sorting_algorithms/Bubble_sort) for
an explanation_ _//a single "comb" over the input list_ **loop until** i +
gap >= input**.size** _//see
[Shell sort](https://rosettacode.org/wiki/Sorting_algorithms/Shell_sort) for
similar idea_ **if** input\[i\] > input\[i+gap\] **swap**(input\[i\],
input\[i+gap\]) swaps := 1 _// Flag a swap has occurred, so the_ _// list is not
guaranteed sorted_ **end if** i := i + 1 **end loop** **end loop** **end
function**
