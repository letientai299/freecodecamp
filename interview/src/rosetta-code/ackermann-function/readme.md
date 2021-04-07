# Ackermann function

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/ackermann-function)

The Ackermann function is a classic example of a recursive function, notable
especially because it is not a primitive recursive function. It grows very
quickly in value, as does the size of its call tree.

The Ackermann function is usually defined as follows:

$A(m, n) = \\begin{cases} n+1 & \\mbox{if } m = 0 \\\\ A(m-1, 1) & \\mbox{if } m > 0 \\mbox{ and } n = 0 \\\\ A(m-1, A(m, n-1)) & \\mbox{if } m > 0 \\mbox{ and } n > 0. \\end{cases}$

Its arguments are never negative and it always terminates.
