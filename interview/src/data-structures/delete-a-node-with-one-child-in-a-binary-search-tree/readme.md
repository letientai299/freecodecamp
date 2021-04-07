# Delete a Node with One Child in a Binary Search Tree

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/delete-a-node-with-one-child-in-a-binary-search-tree)

Now that we can delete leaf nodes let's move on to the second case: deleting a
node with one child. For this case, say we have a tree with the following nodes
1 — 2 — 3 where 1 is the root. To delete 2, we simply need to make the right
reference in 1 point to 3. More generally to delete a node with only one child,
we make that node's parent reference the next node in the tree.
