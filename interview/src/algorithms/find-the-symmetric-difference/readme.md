# Find the Symmetric Difference

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/find-the-symmetric-difference)

The mathematical term symmetric difference (`△` or `⊕`) of two sets is the set
of elements which are in either of the two sets but not in both. For example,
for sets `A = {1, 2, 3}` and `B = {2, 3, 4}`, `A △ B = {1, 4}`.

Symmetric difference is a binary operation, which means it operates on only two
elements. So to evaluate an expression involving symmetric differences among
_three_ elements (`A △ B △ C`), you must complete one operation at a time. Thus,
for sets `A` and `B` above, and `C = {2, 3}`,
`A △ B △ C = (A △ B) △ C = {1, 4} △ {2, 3} = {1, 2, 3, 4}`.
