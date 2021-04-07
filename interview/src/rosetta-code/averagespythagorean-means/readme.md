# Averages/Pythagorean means

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/averagespythagorean-means)

Compute all three of the
[Pythagorean means](https://en.wikipedia.org/wiki/Pythagorean%20means "wp: Pythagorean means")
of the set of integers $1$ through $10$ (inclusive).

Show that
$A(x\_1,\\ldots,x\_n) \\geq G(x\_1,\\ldots,x\_n) \\geq H(x\_1,\\ldots,x\_n)$ for
this set of positive integers.

- The most common of the three means, the [arithmetic
  mean](https://rosettacode.org/wiki/Averages/Arithmetic mean
  "Averages/Arithmetic mean"), is the sum of the list divided by its length:

  $ A(x_1, \\ldots, x_n) = \\frac{x_1 + \\cdots + x_n}{n}$

- The [geometric mean](https://en.wikipedia.org/wiki/Geometric mean "wp:
  Geometric mean") is the $n$th root of the product of the list:

  $ G(x_1, \\ldots, x_n) = \\sqrt\[n\]{x_1 \\cdots x_n} $

- The [harmonic mean](https://en.wikipedia.org/wiki/Harmonic mean "wp: Harmonic
  mean") is $n$ divided by the sum of the reciprocal of each item in the list:

  $ H(x_1, \\ldots, x_n) = \\frac{n}{\\frac{1}{x_1} + \\cdots + \\frac{1}{x_n}}
  $
