# Equilibrium index

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/equilibrium-index)

An equilibrium index of a sequence is an index into the sequence such that the
sum of elements at lower indices is equal to the sum of elements at higher
indices.

For example, in a sequence $A$:

- $A\_0 = -7$
- $A\_1 = 1$
- $A\_2 = 5$
- $A\_3 = 2$
- $A\_4 = -4$
- $A\_5 = 3$
- $A\_6 = 0$

`3` is an equilibrium index, because:

- $A\_0 + A\_1 + A\_2 = A\_4 + A\_5 + A\_6$

`6` is also an equilibrium index, because:

- $A\_0 + A\_1 + A\_2 + A\_3 + A\_4 + A\_5 = 0$

(sum of zero elements is zero)

`7` is not an equilibrium index, because it is not a valid index of sequence
$A$.
