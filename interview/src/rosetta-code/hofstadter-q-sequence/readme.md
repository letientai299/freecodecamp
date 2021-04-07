# Hofstadter Q sequence

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/hofstadter-q-sequence)

The
[Hofstadter Q sequence](https://en.wikipedia.org/wiki/Hofstadter_sequence#Hofstadter_Q_sequence "wp: Hofstadter_sequence#Hofstadter_Q_sequence")
is defined as:

$Q(1)=Q(2)=1, \\\\ Q(n)=Q\\big(n-Q(n-1)\\big)+Q\\big(n-Q(n-2)), \\quad n>2.$

It is defined like the
[Fibonacci sequence](https://rosettacode.org/wiki/Fibonacci%20sequence "Fibonacci sequence"),
but whereas the next term in the Fibonacci sequence is the sum of the previous
two terms, in the Q sequence the previous two terms tell you how far to go back
in the Q sequence to find the two numbers to sum to make the next term of the
sequence.
