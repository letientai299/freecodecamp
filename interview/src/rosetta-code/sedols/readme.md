# SEDOLs

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/sedols)

For each number list of 6-digit
[SEDOL](https://en.wikipedia.org/wiki/SEDOL "wp: SEDOL")s, calculate and append
the checksum digit. That is, given the input string on the left, your function
should return the corresponding string on the right:

710889 => 7108899 B0YBKJ => B0YBKJ7 406566 => 4065663 B0YBLH => B0YBLH2 228276
=> 2282765 B0YBKL => B0YBKL9 557910 => 5579107 B0YBKR => B0YBKR5 585284 =>
5852842 B0YBKT => B0YBKT7 B00030 => B000300

Check that each input is correctly formed, especially with respect to valid
characters allowed in a SEDOL string. Your function should return `null` on an
invalid input.
