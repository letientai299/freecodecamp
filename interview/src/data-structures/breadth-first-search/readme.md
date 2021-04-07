# Breadth-First Search

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/breadth-first-search)

So far, we've learned different ways of creating representations of graphs. What
now? One natural question to have is what are the distances between any two
nodes in the graph? Enter graph traversal algorithms.

Traversal algorithms are algorithms to traverse or visit nodes in a graph. One
type of traversal algorithm is the breadth-first search algorithm.

This algorithm starts at one node and visits all its neighbors that are one edge
away. It then goes on to visit each of their neighbors and so on until all nodes
have been reached.

An important data structure that will help implement the breadth-first search
algorithm is the queue. This is an array where you can add elements to one end
and remove elements from the other end. This is also known as a FIFO or
First-In-First-Out data structure.

Visually, this is what the algorithm is doing.
![Breadth first search algorithm moving through a tree](https://camo.githubusercontent.com/2f57e6239884a1a03402912f13c49555dec76d06/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f342f34362f416e696d617465645f4246532e676966)

The grey shading represents a node getting added into the queue and the black
shading represents a node getting removed from the queue. See how every time a
node gets removed from the queue (node turns black), all their neighbors get
added into the queue (node turns grey).

To implement this algorithm, you'll need to input a graph structure and a node
you want to start at.

First, you'll want to be aware of the distances from, or number of edges away
from, the start node. You'll want to start all your distances with some large
number, like `Infinity`. This prevents counting issues for when a node may not
be reachable from your start node. Next, you'll want to go from the start node
to its neighbors. These neighbors are one edge away and at this point you should
add one unit of distance to the distances you're keeping track of.
