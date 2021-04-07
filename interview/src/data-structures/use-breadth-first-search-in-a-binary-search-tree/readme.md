# Use Breadth First Search in a Binary Search Tree

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/use-breadth-first-search-in-a-binary-search-tree)

Here we will introduce another tree traversal method: breadth-first search. In
contrast to the depth-first search methods from the last challenge,
breadth-first search explores all the nodes in a given level within a tree
before continuing on to the next level. Typically, queues are utilized as helper
data structures in the design of breadth-first search algorithms.

In this method, we start by adding the root node to a queue. Then we begin a
loop where we dequeue the first item in the queue, add it to a new array, and
then inspect both its child subtrees. If its children are not null, they are
each enqueued. This process continues until the queue is empty.
