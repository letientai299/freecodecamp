# Least common multiple

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/least-common-multiple)

The least common multiple of 12 and 18 is 36, because 12 is a factor (12 × 3 =
36), and 18 is a factor (18 × 2 = 36), and there is no positive integer less
than 36 that has both factors. As a special case, if either _m_ or _n_ is zero,
then the least common multiple is zero. One way to calculate the least common
multiple is to iterate all the multiples of _m_, until you find one that is also
a multiple of _n_. If you already have _gcd_ for
[greatest common divisor](https://rosettacode.org/wiki/greatest%20common%20divisor),
then this formula calculates _lcm_. ( \\operatorname{lcm}(m, n) = \\frac{|m
\\times n|}{\\operatorname{gcd}(m, n)} )
