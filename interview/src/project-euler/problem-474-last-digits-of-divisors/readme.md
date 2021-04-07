# Problem 474: Last digits of divisors

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-474-last-digits-of-divisors)

For a positive integer n and digits d, we define F(n, d) as the number of the
divisors of n whose last digits equal d.

For example, F(84, 4) = 3. Among the divisors of 84 (1, 2, 3, 4, 6, 7, 12, 14,
21, 28, 42, 84), three of them (4, 14, 84) have the last digit 4.

We can also verify that F(12!, 12) = 11 and F(50!, 123) = 17888.

Find F(106!, 65432) modulo (1016 + 61).
