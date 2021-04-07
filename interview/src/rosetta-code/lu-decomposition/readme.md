# LU decomposition

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/lu-decomposition)

Every square matrix $A$ can be decomposed into a product of a lower triangular
matrix $L$ and a upper triangular matrix $U$, as described in
[LU decomposition](https://en.wikipedia.org/wiki/LU%20decomposition).

$A = LU$

It is a modified form of Gaussian elimination.

While the
[Cholesky decomposition](http://rosettacode.org/wiki/Cholesky%20decomposition)
only works for symmetric, positive definite matrices, the more general LU
decomposition works for any square matrix.

There are several algorithms for calculating $L$ and $U$.

To derive _Crout's algorithm_ for a 3x3 example, we have to solve the following
system:

\\begin{align}A = \\begin{pmatrix} a\_{11} & a\_{12} & a\_{13}\\\\ a\_{21} &
a\_{22} & a\_{23}\\\\ a\_{31} & a\_{32} & a\_{33}\\\\ \\end{pmatrix}=
\\begin{pmatrix} l\_{11} & 0 & 0 \\\\ l\_{21} & l\_{22} & 0 \\\\ l\_{31} &
l\_{32} & l\_{33}\\\\ \\end{pmatrix} \\begin{pmatrix} u\_{11} & u\_{12} &
u\_{13} \\\\ 0 & u\_{22} & u\_{23} \\\\ 0 & 0 & u\_{33} \\end{pmatrix} =
LU\\end{align}

We now would have to solve 9 equations with 12 unknowns. To make the system
uniquely solvable, usually the diagonal elements of $L$ are set to 1

$l\_{11}=1$

$l\_{22}=1$

$l\_{33}=1$

so we get a solvable system of 9 unknowns and 9 equations.

\\begin{align}A = \\begin{pmatrix} a\_{11} & a\_{12} & a\_{13}\\\\ a\_{21} &
a\_{22} & a\_{23}\\\\ a\_{31} & a\_{32} & a\_{33}\\\\ \\end{pmatrix} =
\\begin{pmatrix} 1 & 0 & 0 \\\\ l\_{21} & 1 & 0 \\\\ l\_{31} & l\_{32} & 1\\\\
\\end{pmatrix} \\begin{pmatrix} u\_{11} & u\_{12} & u\_{13} \\\\ 0 & u\_{22} &
u\_{23} \\\\ 0 & 0 & u\_{33} \\end{pmatrix} = \\begin{pmatrix} u\_{11} & u\_{12}
& u\_{13} \\\\ u\_{11}l\_{21} & u\_{12}l\_{21}+u\_{22} & u\_{13}l\_{21}+u\_{23}
\\\\ u\_{11}l\_{31} & u\_{12}l\_{31}+u\_{22}l\_{32} & u\_{13}l\_{31} +
u\_{23}l\_{32}+u\_{33} \\end{pmatrix} = LU\\end{align}

Solving for the other $l$ and $u$, we get the following equations:

$u\_{11}=a\_{11}$

$u\_{12}=a\_{12}$

$u\_{13}=a\_{13}$

$u\_{22}=a\_{22} - u\_{12}l\_{21}$

$u\_{23}=a\_{23} - u\_{13}l\_{21}$

$u\_{33}=a\_{33} - (u\_{13}l\_{31} + u\_{23}l\_{32})$

and for $l$:

$l\_{21}=\\frac{1}{u\_{11}} a\_{21}$

$l\_{31}=\\frac{1}{u\_{11}} a\_{31}$

$l\_{32}=\\frac{1}{u\_{22}} (a\_{32} - u\_{12}l\_{31})$

We see that there is a calculation pattern, which can be expressed as the
following formulas, first for $U$

$u\_{ij} = a\_{ij} - \\sum\_{k=1}^{i-1} u\_{kj}l\_{ik}$

and then for $L$

$l\_{ij} = \\frac{1}{u\_{jj}} (a\_{ij} - \\sum\_{k=1}^{j-1} u\_{kj}l\_{ik})$

We see in the second formula that to get the $l\_{ij}$ below the diagonal, we
have to divide by the diagonal element (pivot) $u\_{jj}$, so we get problems
when $u\_{jj}$ is either 0 or very small, which leads to numerical instability.

The solution to this problem is _pivoting_ $A$, which means rearranging the rows
of $A$, prior to the $LU$ decomposition, in a way that the largest element of
each column gets onto the diagonal of $A$. Rearranging the rows means to
multiply $A$ by a permutation matrix $P$:

$PA \\Rightarrow A'$

Example:

\\begin{align} \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} \\begin{pmatrix}
1 & 4 \\\\ 2 & 3 \\end{pmatrix} \\Rightarrow \\begin{pmatrix} 2 & 3 \\\\ 1 & 4
\\end{pmatrix} \\end{align}

The decomposition algorithm is then applied on the rearranged matrix so that

$PA = LU$
