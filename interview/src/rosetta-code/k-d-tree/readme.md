# K-d tree

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/k-d-tree)

A k-d tree (short for _k_\-dimensional tree) is a space-partitioning data
structure for organizing points in a k-dimensional space. k-d trees are a useful
data structure for several applications, such as searches involving a
multidimensional search key (e.g. range searches and nearest neighbor searches).
k-d trees are a special case of binary space partitioning trees. k-d trees are
not suitable, however, for efficiently finding the nearest neighbor in high
dimensional spaces. As a general rule, if the dimensionality is _k_, the number
of points in the data, _N_, should be _N_ ≫ 2*k*. Otherwise, when k-d trees are
used with high-dimensional data, most of the points in the tree will be
evaluated and the efficiency is no better than exhaustive search, and other
methods such as approximate nearest-neighbor are used instead.
