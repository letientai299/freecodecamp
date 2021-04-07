# Execute a Markov algorithm

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/execute-a-markov-algorithm)

Create an interpreter for a
[Markov Algorithm](https://en.wikipedia.org/wiki/Markov%20algorithm "wp: Markov algorithm").

Rules have the syntax:

\[ruleset\] ::= ((\[comment\] | \[rule\]) \[newline\]+)\* \[comment\] ::= #
{\[any character\]} \[rule\] ::= \[pattern\] \[whitespace\] -> \[whitespace\]
\[.\] \[replacement\] \[whitespace\] ::= (\[tab\] | \[space\])
\[\[whitespace\]\]

There is one rule per line.

If there is a `.` (period) present before the \[replacement\], then this is a
terminating rule in which case the interpreter must halt execution.

A ruleset consists of a sequence of rules, with optional comments.

Rulesets

Use the following tests on entries:

**Ruleset 1:**

\# This rules file is extracted from Wikipedia:

# `http://en.wikipedia.org/wiki/Markov_Algorithm`

A -> apple B -> bag S -> shop T -> the the shop -> my brother a never used ->
.terminating rule

Sample text of `I bought a B of As from T S.` should generate the output
`I bought a bag of apples from my brother.`

**Ruleset 2:**

A test of the terminating rule

\# Slightly modified from the rules on Wikipedia A -> apple B -> bag S -> .shop
T -> the the shop -> my brother a never used -> .terminating rule

Sample text of `I bought a B of As from T S.` should generate
`I bought a bag of apples from T shop.`

**Ruleset 3:**

This tests for correct substitution order and may trap simple regexp based
replacement routines if special regexp characters are not escaped.

\# BNF Syntax testing rules A -> apple WWWW -> with Bgage -> ->.\* B -> bag
->.\* -> money W -> WW S -> .shop T -> the the shop -> my brother a never used
-> .terminating rule

Sample text of `I bought a B of As W my Bgage from T S.` should generate
`I bought a bag of apples with my money from T shop.`

**Ruleset 4:**

This tests for correct order of scanning of rules, and may trap replacement
routines that scan in the wrong order. It implements a general unary
multiplication engine. (Note that the input expression must be placed within
underscores in this implementation.)

\### Unary Multiplication Engine, for testing Markov Algorithm implementations

### By Donal Fellows.

# Unary addition engine

\_+1 -> \_1+ 1+1 -> 11+

# Pass for converting from the splitting of multiplication into ordinary

# addition

1! -> !1 ,! -> !+ \_! -> \_

# Unary multiplication by duplicating left side, right side times

1\*1 -> x,@y 1x -> xX X, -> 1,1 X1 -> 1X \_x -> \_X ,x -> ,X y1 -> 1y y\_ -> \_

# Next phase of applying

1@1 -> x,@y 1@\_ -> @\_ ,@\_ -> !\_ ++ -> +

# Termination cleanup for addition

\_1 -> 1 1+\_ -> 1 \_+\_ ->

Sample text of `_1111*11111_` should generate the output `11111111111111111111`

**Ruleset 5:**

A simple
[Turing machine](http://en.wikipedia.org/wiki/Turing_machine "link: http://en.wikipedia.org/wiki/Turing_machine"),
implementing a three-state
[busy beaver](http://en.wikipedia.org/wiki/Busy_beaver "link: http://en.wikipedia.org/wiki/Busy_beaver").

The tape consists of `0`s and `1`s, the states are `A`, `B`, `C` and `H` (for
`H`alt), and the head position is indicated by writing the state letter before
the character where the head is. All parts of the initial tape the machine
operates on have to be given in the input.

Besides demonstrating that the Markov algorithm is Turing-complete, it also made
me catch a bug in the C++ implementation which wasn't caught by the first four
rulesets.

\# Turing machine: three-state busy beaver

#

# state A, symbol 0 => write 1, move right, new state B

A0 -> 1B

# state A, symbol 1 => write 1, move left, new state C

0A1 -> C01 1A1 -> C11

# state B, symbol 0 => write 1, move left, new state A

0B0 -> A01 1B0 -> A11

# state B, symbol 1 => write 1, move right, new state B

B1 -> 1B

# state C, symbol 0 => write 1, move left, new state B

0C0 -> B01 1C0 -> B11

# state C, symbol 1 => write 1, move left, halt

0C1 -> H01 1C1 -> H11

This ruleset should turn `000000A000000` into `00011H1111000`
