# Kaprekar numbers

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/kaprekar-numbers)

A positive integer is a
[Kaprekar number](https://en.wikipedia.org/wiki/Kaprekar%20number) if:

- It is 1, or,
- The decimal representation of its square may be split once into two parts
  consisting of positive integers which sum to the original number.

Note that a split resulting in a part consisting purely of 0s is not valid, as 0
is not considered positive.Example

Kaprekar numbers:

- `2223` is a Kaprekar number, as `2223 * 2223 = 4941729`, `4941729` may be
  split to `494` and `1729`, and `494 + 1729 = 2223`
- The series of Kaprekar numbers is known as
  [A006886](https://oeis.org/A006886), and begins as `1, 9, 45, 55, ...`
