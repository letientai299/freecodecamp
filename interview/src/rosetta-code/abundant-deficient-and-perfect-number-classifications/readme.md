# Abundant, deficient and perfect number classifications

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/abundant-deficient-and-perfect-number-classifications)

These define three classifications of positive integers based on their
[proper divisors](https://rosettacode.org/wiki/Proper%20divisors "Proper divisors").

Let $P(n)$ be the sum of the proper divisors of `n` where proper divisors are
all positive integers `n` other than `n` itself.

If `P(n) < n` then `n` is classed as `deficient`

If `P(n) === n` then `n` is classed as `perfect`

If `P(n) > n` then `n` is classed as `abundant`

**Example**: `6` has proper divisors of `1`, `2`, and `3`. `1 + 2 + 3 = 6`, so
`6` is classed as a perfect number.
