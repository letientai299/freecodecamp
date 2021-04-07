# Set of real numbers

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/set-of-real-numbers)

All real numbers form the uncountable set ℝ. Among its subsets, relatively
simple are the convex sets, each expressed as a range between two real numbers
_a_ and _b_ where _a_ ≤ _b_. There are actually four cases for the meaning of
"between", depending on open or closed boundary:

- \[_a_, _b_\]: {_x_ | _a_ ≤ _x_ and _x_ ≤ _b_ }
- (_a_, _b_): {_x_ | _a_ < _x_ and _x_ < _b_ }
- \[_a_, _b_): {_x_ | _a_ ≤ _x_ and _x_ < _b_ }
- (_a_, _b_\]: {_x_ | _a_ < _x_ and _x_ ≤ _b_ }

Note that if _a_ = _b_, of the four only \[_a_, _a_\] would be non-empty.

**Task**

- Devise a way to represent any set of real numbers, for the definition of "any"
  in the implementation notes below.
- Provide methods for these common set operations (_x_ is a real number; _A_ and
  _B_ are sets):

- _x_ ∈ _A_: determine if _x_ is an element of _A_

  example: 1 is in \[1, 2), while 2, 3, ... are not.

- _A_ ∪ _B_: union of _A_ and _B_, i.e. {_x_ | _x_ ∈ _A_ or _x_ ∈ _B_}

  example: \[0, 2) ∪ (1, 3) = \[0, 3); \[0, 1) ∪ (2, 3\] = well, \[0, 1) ∪ (2,
  3\]

- _A_ ∩ _B_: intersection of _A_ and _B_, i.e. {_x_ | _x_ ∈ _A_ and _x_ ∈ _B_}

  example: \[0, 2) ∩ (1, 3) = (1, 2); \[0, 1) ∩ (2, 3\] = empty set

- _A_ - _B_: difference between _A_ and _B_, also written as _A_ \\ _B_, i.e.
  {_x_ | _x_ ∈ _A_ and _x_ ∉ _B_}

  example: \[0, 2) − (1, 3) = \[0, 1\]
