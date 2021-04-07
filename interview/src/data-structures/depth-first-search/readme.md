# Depth-First Search

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/depth-first-search)

Similar to breadth-first search, here we will learn about another graph
traversal algorithm called depth-first search.

Whereas the breadth-first search searches incremental edge lengths away from the
source node, depth-first search first goes down a path of edges as far as it
can.

Once it reaches one end of a path, the search will backtrack to the last node
with an un-visited edge path and continue searching.

The animation below shows how the algorithm works. The algorithm starts with the
top node and visits the nodes in the numbered order.

![](https://camo.githubusercontent.com/aaad9e39961daf34d967c616edeb50abf3bf1235/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37662f44657074682d46697273742d5365617263682e676966)

Notice how, unlike breadth-first search, every time a node is visited, it
doesn't visit all of its neighbors. Instead, it first visits one of its
neighbors and continues down that path until there are no more nodes to be
visited on that path.

To implement this algorithm, you'll want to use a stack. A stack is an array
where the last element added is the first to be removed. This is also known as a
Last-In-First-Out data structure. A stack is helpful in depth-first search
algorithms because, as we add neighbors to the stack, we want to visit the most
recently added neighbors first and remove them from the stack.

A simple output of this algorithm is a list of nodes which are reachable from a
given node. Therefore, you'll also want to keep track of the nodes you visit.
