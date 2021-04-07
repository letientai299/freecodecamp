# Use Depth First Search in a Binary Search Tree

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/use-depth-first-search-in-a-binary-search-tree)

We know how to search a binary search tree for a specific value. But what if we
just want to explore the entire tree? Or what if we don't have an ordered tree
and we need to just search for a value? Here we will introduce some tree
traversal methods which can be used to explore tree data structures. First up is
depth-first search. In depth-first search, a given subtree is explored as deeply
as possible before the search continues on to another subtree. There are three
ways this can be done: In-order: Begin the search at the left-most node and end
at the right-most node. Pre-order: Explore all the roots before the leaves.
Post-order: Explore all the leaves before the roots. As you may guess, you may
choose different search methods depending on what type of data your tree is
storing and what you are looking for. For a binary search tree, an inorder
traversal returns the nodes in sorted order.
