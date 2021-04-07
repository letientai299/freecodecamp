# Closest-pair problem

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/closest-pair-problem)

Provide a function to find the closest two points among a set of given points in
two dimensions, i.e. to solve the
[Closest pair of points problem](https://en.wikipedia.org/wiki/Closest%20pair%20of%20points%20problem "wp: Closest pair of points problem")
in the _planar_ case.

The straightforward solution is a O(n2) algorithm (which we can call
_brute-force algorithm_); the pseudo-code (using indexes) could be simply:

**bruteForceClosestPair** of P(1), P(2), ... P(N) **if** N < 2 **then**
**return** ∞ **else** minDistance ← |P(1) - P(2)| minPoints ← { P(1), P(2) }
**foreach** i ∈ \[1, N-1\] **foreach** j ∈ \[i+1, N\] **if** |P(i) - P(j)| <
minDistance **then** minDistance ← |P(i) - P(j)| minPoints ← { P(i), P(j) }
**endif** **endfor** **endfor** **return** minDistance, minPoints **endif**

A better algorithm is based on the recursive divide and conquer approach, as
explained also at
[Wikipedia's Closest pair of points problem](https://en.wikipedia.org/wiki/Closest%20pair%20of%20points%20problem#Planar_case "wp: Closest pair of points problem#Planar_case"),
which is `O(nlog(n))` a pseudo-code could be:

**closestPair** of (xP, yP) where xP is P(1) .. P(N) sorted by x coordinate, and
yP is P(1) .. P(N) sorted by y coordinate (ascending order) **if** N ≤ 3
**then** **return** closest points of xP using brute-force algorithm **else** xL
← points of xP from 1 to ⌈N/2⌉ xR ← points of xP from ⌈N/2⌉+1 to N xm ←
xP(⌈N/2⌉)x yL ← { p ∈ yP : px ≤ xm } yR ← { p ∈ yP : px > xm } (dL, pairL) ←
closestPair of (xL, yL) (dR, pairR) ← closestPair of (xR, yR) (dmin, pairMin) ←
(dR, pairR) **if** dL < dR **then** (dmin, pairMin) ← (dL, pairL) **endif** yS ←
{ p ∈ yP : |xm - px| < dmin } nS ← number of points in yS (closest, closestPair)
← (dmin, pairMin) **for** i **from** 1 **to** nS - 1 k ← i + 1 **while** k ≤ nS
**and** yS(k)y - yS(i)y < dmin **if** |yS(k) - yS(i)| < closest **then**
(closest, closestPair) ← (|yS(k) - yS(i)|, {yS(k), yS(i)}) **endif** k ← k + 1
**endwhile** **endfor** **return** closest, closestPair **endif**

For the input, expect the argument to be an array of objects (points) with `x`
and `y` members set to numbers. For the output, return an object containing the
key:value pairs for `distance` and `pair` (the pair of two closest points).

**References and further readings:**

- [Closest pair of points problem](https://en.wikipedia.org/wiki/Closest pair of
  points problem "wp: Closest pair of points problem")
- [Closest Pair (McGill)](https://www.cs.mcgill.ca/~cs251/ClosestPair/ClosestPairDQ.html)
- [Closest Pair (UCSB)](https://www.cs.ucsb.edu/~suri/cs235/ClosestPair.pdf)
- [Closest pair (WUStL)](https://classes.cec.wustl.edu/~cse241/handouts/closestpair.pdf)
