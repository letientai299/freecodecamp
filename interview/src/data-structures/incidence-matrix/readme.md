# Incidence Matrix

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/incidence-matrix)

Yet another way to represent a graph is to put it in an incidence matrix.

An incidence matrix is a two-dimensional (2D) array. Generally speaking, an
incidence matrix relates two different classes of objects between its two
dimensions. This kind of matrix is similar to an adjacency matrix. However, the
rows and columns mean something else here.

In graphs, we have edges and nodes. These will be our "two different classes of
objects". This matrix will have the rows be the nodes and columns be the edges.
This means that we can have an uneven number of rows and columns.

Each column will represent a unique edge. Also, each edge connects two nodes. To
show that there is an edge between two nodes, you will put a 1 in the two rows
of a particular column. Below is a 3 node graph with one edge between node 1 and
node 3.

> 1
>
> \---
>
> 1 | 1
>
> 2 | 0
>
> 3 | 1

Here is an example of an `incidence matrix` with 4 edges and 4 nodes. Remember,
the columns are the edges and rows are the nodes themselves.

> 1 2 3 4
>
> \--------
>
> 1 | 0 1 1 1
>
> 2 | 1 1 0 0
>
> 3 | 1 0 0 1
>
> 4 | 0 0 1 0

Below is a JavaScript implementation of the same thing.

```js
var incMat = [
  [0, 1, 1, 1],
  [1, 1, 0, 0],
  [1, 0, 0, 1],
  [0, 0, 1, 0],
];
```

To make a directed graph, use `-1` for an edge leaving a particular node and `1`
for an edge entering a node.

```js
var incMatDirected = [
  [0, -1, 1, -1],
  [-1, 1, 0, 0],
  [1, 0, 0, 1],
  [0, 0, -1, 0],
];
```

Graphs can also have weights on their edges. So far, we have unweighted edges
where just the presence and lack of edge is binary (`0` or `1`). You can have
different weights depending on your application. A different weight is
represented as numbers greater than 1.
