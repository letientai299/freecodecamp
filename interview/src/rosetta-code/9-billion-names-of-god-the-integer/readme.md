# 9 billion names of God the integer

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/9-billion-names-of-god-the-integer)

This task is a variation of the
[short story by Arthur C. Clarke](https://en.wikipedia.org/wiki/The%20Nine%20Billion%20Names%20of%20God#Plot_summary "wp: The Nine Billion Names of God#Plot_summary").

(Solvers should be aware of the consequences of completing this task.)

In detail, to specify what is meant by a "name":

- The integer 1 has 1 name "1".
- The integer 2 has 2 names "1+1" and "2".
- The integer 3 has 3 names "1+1+1", "2+1", and "3".
- The integer 4 has 5 names "1+1+1+1", "2+1+1", "2+2", "3+1", "4".
- The integer 5 has 7 names "1+1+1+1+1", "2+1+1+1", "2+2+1", "3+1+1", "3+2",
  "4+1", "5".

This can be visualized in the following form:

          1
        1   1
      1   1   1
    1   2   1   1

1 2 2 1 1 1 3 3 2 1 1

Where row $n$ corresponds to integer $n$, and each column $C$ in row $m$ from
left to right corresponds to the number of names beginning with $C$.

Optionally note that the sum of the $n$-th row $P(n)$ is the integer partition
function.
