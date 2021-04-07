# Problem 479: Roots on the Rise

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler/problem-479-roots-on-the-rise)

Let ak, bk, and ck represent the three solutions (real or complex numbers) to
the expression 1/x = (k/x)2(k+x2) - kx.

For instance, for k = 5, we see that {a5, b5, c5} is approximately {5.727244,
-0.363622+2.057397i, -0.363622-2.057397i}.

Let S(n) = Σ (ak+bk)p(bk+ck)p(ck+ak)p for all integers p, k such that 1 ≤ p, k ≤
n.

Interestingly, S(n) is always an integer. For example, S(4) = 51160.

Find S(106) modulo 1 000 000 007.
