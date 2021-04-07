# Linear congruential generator

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/linear-congruential-generator)

The
[linear congruential generator](https://en.wikipedia.org/wiki/linear%20congruential%20generator)
is a very simple example of a
[random number generator](http://rosettacode.org/wiki/random%20number%20generator).
All linear congruential generators use this formula:

$$r\_{n + 1} = (a \\times r\_n + c) \\bmod m$$

Where:

- $ r_0 $ is a seed.
- $r\_1$, $r\_2$, $r\_3$, ..., are the random numbers.
- $a$, $c$, $m$ are constants.

If one chooses the values of $a$, $c$ and $m$ with care, then the generator
produces a uniform distribution of integers from $0$ to $m - 1$.

LCG numbers have poor quality. $r\_n$ and $r\_{n + 1}$ are not independent, as
true random numbers would be. Anyone who knows $r\_n$ can predict $r\_{n + 1}$,
therefore LCG is not cryptographically secure. The LCG is still good enough for
simple tasks like
[Miller-Rabin primality test](http://rosettacode.org/wiki/Miller-Rabin%20primality%20test),
or [FreeCell deals](http://rosettacode.org/wiki/deal%20cards%20for%20FreeCell).
Among the benefits of the LCG, one can easily reproduce a sequence of numbers,
from the same $r\_0$. One can also reproduce such sequence with a different
programming language, because the formula is so simple.
