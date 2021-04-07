# Problem 461: Almost Pi

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-461-almost-pi)

Let `f(k, n)` = $e^\\frac{k}{n} - 1$, for all non-negative integers `k`.

Remarkably, `f(6, 200) + f(75, 200) + f(89, 200) + f(226, 200)` = 3.1415926… ≈
π.

In fact, it is the best approximation of π of the form
`f(a, 200) + f(b, 200) + f(c, 200) + f(d, 200)`.

Let `almostPi(n)` = a2 + b2 + c2 + d2 for a, b, c, d that minimize the error:
$\\lvert f(a,n) + f(b,n) + f(c,n) + f(d,n) - \\Pi\\rvert$

You are given `almostPi(200)` = 62 + 752 + 892 + 2262 = 64658.
