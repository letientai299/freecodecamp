# Cramer's rule

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/cramers-rule)

In
[linear algebra](https://en.wikipedia.org/wiki/linear%20algebra "wp: linear algebra"),
[Cramer's rule](https://en.wikipedia.org/wiki/Cramer's%20rule "wp: Cramer's rule")
is an explicit formula for the solution of a
[system of linear equations](https://en.wikipedia.org/wiki/system%20of%20linear%20equations "wp: system of linear equations")
with as many equations as unknowns, valid whenever the system has a unique
solution. It expresses the solution in terms of the determinants of the (square)
coefficient matrix and of matrices obtained from it by replacing one column by
the vector of right hand sides of the equations.

Given

$\\left\\{\\begin{matrix}a\_1x + b\_1y + c\_1z&= {\\color{red}d\_1}\\\\a\_2x + b\_2y + c\_2z&= {\\color{red}d\_2}\\\\a\_3x + b\_3y + c\_3z&= {\\color{red}d\_3}\\end{matrix}\\right.$

which in matrix format is

$\\begin{bmatrix} a\_1 & b\_1 & c\_1 \\\\ a\_2 & b\_2 & c\_2 \\\\ a\_3 & b\_3 & c\_3 \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix}=\\begin{bmatrix} {\\color{red}d\_1} \\\\ {\\color{red}d\_2} \\\\ {\\color{red}d\_3} \\end{bmatrix}.$

Then the values of $x, y$ and $z$ can be found as follows:

$x = \\frac{\\begin{vmatrix} {\\color{red}d\_1} & b\_1 & c\_1 \\\\ {\\color{red}d\_2} & b\_2 & c\_2 \\\\ {\\color{red}d\_3} & b\_3 & c\_3 \\end{vmatrix} } { \\begin{vmatrix} a\_1 & b\_1 & c\_1 \\\\ a\_2 & b\_2 & c\_2 \\\\ a\_3 & b\_3 & c\_3 \\end{vmatrix}}, \\quad y = \\frac {\\begin{vmatrix} a\_1 & {\\color{red}d\_1} & c\_1 \\\\ a\_2 & {\\color{red}d\_2} & c\_2 \\\\ a\_3 & {\\color{red}d\_3} & c\_3 \\end{vmatrix}} {\\begin{vmatrix} a\_1 & b\_1 & c\_1 \\\\ a\_2 & b\_2 & c\_2 \\\\ a\_3 & b\_3 & c\_3 \\end{vmatrix}}, \\text{ and }z = \\frac { \\begin{vmatrix} a\_1 & b\_1 & {\\color{red}d\_1} \\\\ a\_2 & b\_2 & {\\color{red}d\_2} \\\\ a\_3 & b\_3 & {\\color{red}d\_3} \\end{vmatrix}} {\\begin{vmatrix} a\_1 & b\_1 & c\_1 \\\\ a\_2 & b\_2 & c\_2 \\\\ a\_3 & b\_3 & c\_3 \\end{vmatrix} }.$
