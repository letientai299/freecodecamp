# Adjacency Matrix

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/adjacency-matrix)

Another way to represent a graph is to put it in an adjacency matrix. An
adjacency matrix is a two-dimensional (2D) array where each nested array has the
same number of elements as the outer array. In other words, it is a matrix or
grid of numbers, where the numbers represent the edges.

**Note**: The numbers to the top and left of the matrix are just labels for the
nodes. Inside the matrix, ones mean there exists an edge between the vertices
(nodes) representing the row and column. Finally, zeros mean there is no edge or
relationship.

    1 2 3

\\------ 1 | 0 1 1 2 | 1 0 0 3 | 1 0 0

Above is a very simple, undirected graph where you have three nodes, where the
first node is connected to the second and third node. Below is a JavaScript
implementation of the same thing.

```js
var adjMat = [
  [0, 1, 1],
  [1, 0, 0],
  [1, 0, 0],
];
```

Unlike an adjacency list, each "row" of the matrix has to have the same number
of elements as nodes in the graph. Here we have a three by three matrix, which
means we have three nodes in our graph. A directed graph would look similar.
Below is a graph where the first node has an edge pointing toward the second
node, and then the second node has an edge pointing to the third node.

```js
var adjMatDirected = [
  [0, 1, 0],
  [0, 0, 1],
  [0, 0, 0],
];
```

Graphs can also have weights on their edges. So far, we have unweighted edges
where just the presence and lack of edge is binary (`0` or `1`). You can have
different weights depending on your application.
