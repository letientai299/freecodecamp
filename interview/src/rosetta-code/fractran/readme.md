# Fractran

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/fractran)

[FRACTRAN](https://en.wikipedia.org/wiki/FRACTRAN "wp: FRACTRAN") is a
Turing-complete esoteric programming language invented by the mathematician
[John Horton Conway](https://en.wikipedia.org/wiki/John%20Horton%20Conway "wp: John Horton Conway").

A FRACTRAN program is an ordered list of positive fractions
$P = (f\_1, f\_2, \\ldots, f\_m)$, together with an initial positive integer
input $n$.

The program is run by updating the integer $n$ as follows:

- for the first fraction, $f\_i$, in the list for which $nf\_i$ is an integer,
  replace $n$ with $nf\_i$ ;
- repeat this rule until no fraction in the list produces an integer when
  multiplied by $n$, then halt.

Conway gave a program for primes in FRACTRAN:

$\\dfrac{17}{91}$, $\\dfrac{78}{85}$, $\\dfrac{19}{51}$, $\\dfrac{23}{38}$,
$\\dfrac{29}{33}$, $\\dfrac{77}{29}$, $\\dfrac{95}{23}$, $\\dfrac{77}{19}$,
$\\dfrac{1}{17}$, $\\dfrac{11}{13}$, $\\dfrac{13}{11}$, $\\dfrac{15}{14}$,
$\\dfrac{15}{2}$, $\\dfrac{55}{1}$

Starting with $n=2$, this FRACTRAN program will change $n$ to
$15=2\\times (\\frac{15}{2})$, then $825=15\\times (\\frac{55}{1})$, generating
the following sequence of integers:

$2$, $15$, $825$, $725$, $1925$, $2275$, $425$, $390$, $330$, $290$, $770$,
$\\ldots$

After 2, this sequence contains the following powers of 2:

$2^2=4$, $2^3=8$, $2^5=32$, $2^7=128$, $2^{11}=2048$, $2^{13}=8192$,
$2^{17}=131072$, $2^{19}=524288$, $\\ldots$

which are the prime powers of 2.
