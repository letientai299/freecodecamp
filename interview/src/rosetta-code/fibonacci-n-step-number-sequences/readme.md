# Fibonacci n-step number sequences

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/fibonacci-n-step-number-sequences)

These number series are an expansion of the ordinary
[Fibonacci sequence](https://rosettacode.org/wiki/Fibonacci%20sequence "Fibonacci sequence")
where:

1.  For $n = 2$ we have the Fibonacci sequence; with initial values $\[1, 1\]$
    and $F\_k^2 = F\_{k-1}^2 + F\_{k-2}^2$
2.  For $n = 3$ we have the tribonacci sequence; with initial values
    $\[1, 1, 2\]$ and $F\_k^3 = F\_{k-1}^3 + F\_{k-2}^3 + F\_{k-3}^3$
3.  For $n = 4$ we have the tetranacci sequence; with initial values
    $\[1, 1, 2, 4\]$ and
    $F\_k^4 = F\_{k-1}^4 + F\_{k-2}^4 + F\_{k-3}^4 + F\_{k-4}^4$...
4.  For general $n>2$ we have the Fibonacci $n$-step sequence - $F\_k^n$; with
    initial values of the first $n$ values of the $(n-1)$'th Fibonacci $n$-step
    sequence $F\_k^{n-1}$; and $k$'th value of this $n$'th sequence being
    $F\_k^n = \\sum\_{i=1}^{(n)} {F\_{k-i}^{(n)}}$

For small values of $n$,
[Greek numeric prefixes](https://en.wikipedia.org/wiki/Number%20prefix#Greek_series "wp: Number prefix#Greek_series")
are sometimes used to individually name each series.

Fibonacci $n$-step sequences:

| $n$ | Series name | Values                                                 |
| --- | ----------- | ------------------------------------------------------ |
| 2   | fibonacci   | 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 ...         |
| 3   | tribonacci  | 1 1 2 4 7 13 24 44 81 149 274 504 927 1705 3136 ...    |
| 4   | tetranacci  | 1 1 2 4 8 15 29 56 108 208 401 773 1490 2872 5536 ...  |
| 5   | pentanacci  | 1 1 2 4 8 16 31 61 120 236 464 912 1793 3525 6930 ...  |
| 6   | hexanacci   | 1 1 2 4 8 16 32 63 125 248 492 976 1936 3840 7617 ...  |
| 7   | heptanacci  | 1 1 2 4 8 16 32 64 127 253 504 1004 2000 3984 7936 ... |
| 8   | octonacci   | 1 1 2 4 8 16 32 64 128 255 509 1016 2028 4048 8080 ... |
| 9   | nonanacci   | 1 1 2 4 8 16 32 64 128 256 511 1021 2040 4076 8144 ... |
| 10  | decanacci   | 1 1 2 4 8 16 32 64 128 256 512 1023 2045 4088 8172 ... |

Allied sequences can be generated where the initial values are changed: The
[Lucas series](https://en.wikipedia.org/wiki/Lucas%20number "wp: Lucas number")
sums the two preceding values like the fibonacci series for $n=2$ but uses
$\[2, 1\]$ as its initial values.
