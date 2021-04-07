# Delete a Node with Two Children in a Binary Search Tree

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/delete-a-node-with-two-children-in-a-binary-search-tree)

Removing nodes that have two children is the hardest case to implement. Removing
a node like this produces two subtrees that are no longer connected to the
original tree structure. How can we reconnect them? One method is to find the
smallest value in the right subtree of the target node and replace the target
node with this value. Selecting the replacement in this way ensures that it is
greater than every node in the left subtree it becomes the new parent of but
also less than every node in the right subtree it becomes the new parent of.
Once this replacement is made the replacement node must be removed from the
right subtree. Even this operation is tricky because the replacement may be a
leaf or it may itself be the parent of a right subtree. If it is a leaf we must
remove its parent's reference to it. Otherwise, it must be the right child of
the target. In this case, we must replace the target value with the replacement
value and make the target reference the replacement's right child.
