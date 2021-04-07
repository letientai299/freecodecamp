# Ethiopian multiplication

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/ethiopian-multiplication)

Ethiopian multiplication is a method of multiplying integers using only
addition, doubling, and halving.

**Method:**

1.  Take two numbers to be multiplied and write them down at the top of two
    columns
2.  In the left-hand column repeatedly halve the last number, discarding any
    remainders, and write the result below the last in the same column, until
    you write a value of `1`
3.  In the right-hand column repeatedly double the last number and write the
    result below. stop when you add a result in the same row as where the left
    hand column shows `1`
4.  Examine the table produced and discard any row where the value in the left
    column is even
5.  Sum the values in the right-hand column that remain to produce the result of
    multiplying the original two numbers together

**For example:** `17 × 34`

17 34

Halving the first column:

17 34 8 4 2 1

Doubling the second column:

17 34 8 68 4 136 2 272 1 544

Strike-out rows whose first cell is even:

17 34 8 ~68~ 4 ~136~ 2 ~272~ 1 544

Sum the remaining numbers in the right-hand column:

17 34 8 -- 4 --- 2 --- 1 544 ==== 578

So `17` multiplied by `34`, by the Ethiopian method is `578`.
