# Entropy

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/entropy)

Calculate the Shannon entropy H of a given input string.

Given the discreet random variable $X$ that is a string of $N$ "symbols" (total
characters) consisting of $n$ different characters (n=2 for binary), the Shannon
entropy of X in bits/symbol is:

$H\_2(X) = -\\sum\_{i=1}^n \\frac{count\_i}{N} \\log\_2 \\left(\\frac{count\_i}{N}\\right)$

where $count\_i$ is the count of character $n\_i$.
