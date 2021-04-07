# Problem 375: Minimum of subsequences

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-375-minimum-of-subsequences)

Let Sn be an integer sequence produced with the following pseudo-random number
generator:

S0

\=

290797

Sn+1

\=

Sn2 mod 50515093

Let A(i, j) be the minimum of the numbers Si, Si+1, ... , Sj for i ≤ j. Let M(N)
= ΣA(i, j) for 1 ≤ i ≤ j ≤ N. We can verify that M(10) = 432256955 and M(10 000)
= 3264567774119.

Find M(2 000 000 000).
