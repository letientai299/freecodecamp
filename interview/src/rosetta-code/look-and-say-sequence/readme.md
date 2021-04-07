# Look-and-say sequence

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/look-and-say-sequence)

The
[Look and say sequence](https://en.wikipedia.org/wiki/Look%20and%20say%20sequence)
is a recursively defined sequence of numbers.

Sequence Definition

- Take a decimal number
- Look at the number, visually grouping consecutive runs of the same digit.
- Say the number, from left to right, group by group; as how many of that digit
  there are - followed by the digit grouped.

This becomes the next number of the sequence.

An example:

- Starting with the number 1, you have one 1 which produces 11
- Starting with 11, you have two 1's. I.E.: 21
- Starting with 21, you have one 2, then one 1. I.E.: (12)(11) which becomes
  1211
- Starting with 1211, you have one 1, one 2, then two 1's. I.E.: (11)(12)(21)
  which becomes 111221
