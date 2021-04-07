# Set consolidation

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/set-consolidation)

Given two sets of items then if any item is common to any set then the result of
applying _consolidation_ to those sets is a set of sets whose contents is:

- The two input sets if no common item exists between the two input sets of
  items.
- The single set that is the union of the two input sets if they share a common
  item.

Given N sets of items where N > 2 then the result is the same as repeatedly
replacing all combinations of two sets by their consolidation until no further
consolidation between set pairs is possible. If N < 2 then consolidation has no
strict meaning and the input can be returned.

Here are some examples:

**Example 1:**

Given the two sets `{A,B}` and `{C,D}` then there is no common element between
the sets and the result is the same as the input.

**Example 2:**

Given the two sets `{A,B}` and `{B,D}` then there is a common element `B`
between the sets and the result is the single set `{B,D,A}`. (Note that order of
items in a set is immaterial: `{A,B,D}` is the same as `{B,D,A}` and `{D,A,B}`,
etc).

**Example 3:**

Given the three sets `{A,B}` and `{C,D}` and `{D,B}` then there is no common
element between the sets `{A,B}` and `{C,D}` but the sets `{A,B}` and `{D,B}` do
share a common element that consolidates to produce the result `{B,D,A}`. On
examining this result with the remaining set, `{C,D}`, they share a common
element and so consolidate to the final output of the single set `{A,B,C,D}`

**Example 4:**

The consolidation of the five sets:

`{H,I,K}`, `{A,B}`, `{C,D}`, `{D,B}`, and `{F,G,H}`

Is the two sets:

`{A, C, B, D}`, and `{G, F, I, H, K}`
