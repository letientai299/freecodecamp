# Levenshtein distance

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/levenshtein-distance)

In information theory and computer science, the **Levenshtein distance** is a
[metric](https://en.wikipedia.org/wiki/string%20metric) for measuring the amount
of difference between two sequences (i.e. an
[edit distance](https://en.wikipedia.org/wiki/edit%20distance)). The Levenshtein
distance between two strings is defined as the minimum number of edits needed to
transform one string into the other, with the allowable edit operations being
insertion, deletion, or substitution of a single character.

Example:

The Levenshtein distance between "**kitten**" and "**sitting**" is 3, since the
following three edits change one into the other, and there isn't a way to do it
with fewer than three edits:

- **k**itten   **s**itten    (substitution of 'k' with 's')
- sitt**e**n   sitt**i**n    (substitution of 'e' with 'i')
- sittin   sittin**g**    (insert 'g' at the end).

_The Levenshtein distance between "**rosettacode**", "**raisethysword**" is
**8**._

_The distance between two strings is same as that when both strings are
reversed._
