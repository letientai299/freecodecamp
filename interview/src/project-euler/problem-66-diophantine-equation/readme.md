# Problem 66: Diophantine equation

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-66-diophantine-equation)

Consider quadratic Diophantine equations of the form:

x2 – Dy2 = 1

For example, when D=13, the minimal solution in x is 6492 – 13×1802 = 1.

It can be assumed that there are no solutions in positive integers when D is
square.

By finding minimal solutions in x for D = {2, 3, 5, 6, 7}, we obtain the
following:

32 – 2×22 = 1

22 – 3×12 = 1

**9**2 – 5×42 = 1

52 – 6×22 = 1

82 – 7×32 = 1

Hence, by considering minimal solutions in `x` for D ≤ 7, the largest `x` is
obtained when D=5.

Find the value of D ≤ 1000 in minimal solutions of `x` for which the largest
value of `x` is obtained.
