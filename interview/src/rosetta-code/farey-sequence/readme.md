# Farey sequence

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/farey-sequence)

The
[Farey sequence](https://en.wikipedia.org/wiki/Farey%20sequence "wp: Farey sequence")
`Fn` of order `n` is the sequence of completely reduced fractions between `0`
and `1` which, when in lowest terms, have denominators less than or equal to
`n`, arranged in order of increasing size.

The _Farey sequence_ is sometimes incorrectly called a _Farey series_.

Each Farey sequence:

- starts with the value 0, denoted by the fraction $ \\frac{0}{1} $
- ends with the value 1, denoted by the fraction $ \\frac{1}{1}$.

The Farey sequences of orders `1` to `5` are:

- ${\\bf\\it{F}}\_1 = \\frac{0}{1}, \\frac{1}{1}$
- ${\\bf\\it{F}}\_2 = \\frac{0}{1}, \\frac{1}{2}, \\frac{1}{1}$
- ${\\bf\\it{F}}\_3 = \\frac{0}{1}, \\frac{1}{3}, \\frac{1}{2}, \\frac{2}{3}, \\frac{1}{1}$
- ${\\bf\\it{F}}\_4 = \\frac{0}{1}, \\frac{1}{4}, \\frac{1}{3}, \\frac{1}{2}, \\frac{2}{3}, \\frac{3}{4}, \\frac{1}{1}$
- ${\\bf\\it{F}}\_5 = \\frac{0}{1}, \\frac{1}{5}, \\frac{1}{4}, \\frac{1}{3}, \\frac{2}{5}, \\frac{1}{2}, \\frac{3}{5}, \\frac{2}{3}, \\frac{3}{4}, \\frac{4}{5}, \\frac{1}{1}$
