# Y combinator

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/y-combinator)

In strict
[functional programming](https://en.wikipedia.org/wiki/Functional%20programming "wp: functional programming")
and the
[lambda calculus](https://en.wikipedia.org/wiki/lambda%20calculus "wp: lambda calculus"),
functions (lambda expressions) don't have state and are only allowed to refer to
arguments of enclosing functions. This rules out the usual definition of a
recursive function wherein a function is associated with the state of a variable
and this variable's state is used in the body of the function. The
[Y combinator](https://mvanier.livejournal.com/2897.html) is itself a stateless
function that, when applied to another stateless function, returns a recursive
version of the function. The Y combinator is the simplest of the class of such
functions, called
[fixed-point combinators](https://en.wikipedia.org/wiki/Fixed-point%20combinator "wp: fixed-point combinator").
