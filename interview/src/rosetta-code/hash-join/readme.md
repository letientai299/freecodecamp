# Hash join

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/hash-join)

An
[inner join](<https://en.wikipedia.org/wiki/Join_(SQL)#Inner_join> "wp: Join_(SQL)#Inner_join")
is an operation that combines two data tables into one table, based on matching
column values. The simplest way of implementing this operation is the
[nested loop join](https://en.wikipedia.org/wiki/Nested%20loop%20join "wp: Nested loop join")
algorithm, but a more scalable alternative is the
[hash join](https://en.wikipedia.org/wiki/hash%20join "wp: hash join")
algorithm.

The "hash join" algorithm consists of two steps:

1.  **Hash phase:** Create a
    [multimap](https://en.wikipedia.org/wiki/Multimap "wp: Multimap") from one
    of the two tables, mapping from each join column value to all the rows that
    contain it.

- The multimap must support hash-based lookup which scales better than a simple
  linear search, because that's the whole point of this algorithm.
- Ideally we should create the multimap for the smaller table, thus minimizing
  its creation time and memory size.

3.  **Join phase:** Scan the other table, and find matching rows by looking in
    the multimap created before.

In pseudo-code, the algorithm could be expressed as follows:

**let** _A_ = the first input table (or ideally, the larger one) **let** _B_ =
the second input table (or ideally, the smaller one) **let** _jA_ = the join
column ID of table _A_ **let** _jB_ = the join column ID of table _B_ **let**
_MB_ = a multimap for mapping from single values to multiple rows of table _B_
(starts out empty) **let** _C_ = the output table (starts out empty) **for
each** row _b_ in table _B_: **place** _b_ in multimap _MB_ under key _b(jB)_
**for each** row _a_ in table _A_: **for each** row _b_ in multimap _MB_ under
key _a(jA)_: **let** _c_ = the concatenation of row _a_ and row _b_ **place**
row _c_ in table _C_
