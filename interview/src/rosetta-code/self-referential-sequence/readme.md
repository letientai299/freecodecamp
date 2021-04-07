# Self-referential sequence

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/self-referential-sequence)

There are several ways to generate a self-referential sequence. One very common
one (the
[Look-and-say sequence](https://rosettacode.org/wiki/Look-and-say%20sequence))
is to start with a positive integer, then generate the next term by
concatenating enumerated groups of adjacent alike digits:

0, 10, 1110, 3110, 132110, 1113122110, 311311222110 ...

The terms generated grow in length geometrically and never converge.

Another way to generate a self-referential sequence is to summarize the previous
term.

Count how many of each alike digit there is, then concatenate the sum and digit
for each of the sorted enumerated digits. Note that the first five terms are the
same as for the previous sequence.

0, 10, 1110, 3110, 132110, 13123110, 23124110 ...

Sort the digits largest to smallest. Do not include counts of digits that do not
appear in the previous term.

Depending on the seed value, series generated this way always either converge to
a stable value or to a short cyclical pattern. (For our purposes, converge means
that an element matches a previously seen element.) The sequence shown, with a
seed value of 0, converges to a stable value of 1433223110 after 11 iterations.
The seed value that converges most quickly is 22. It goes stable after the first
element. (The next element is 22, which has been seen before.)
