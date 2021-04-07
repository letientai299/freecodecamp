# Delete a Leaf Node in a Binary Search Tree

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/delete-a-leaf-node-in-a-binary-search-tree)

This is the first of three challenges where we will implement a more difficult
operation in binary search trees: deletion. Deletion is difficult because
removing nodes breaks links in the tree. These links must be carefully
reestablished to ensure the binary tree structure is maintained. For some
deletions, this means the tree must be rearranged. In general, you will
encounter one of three cases when trying to delete a node: Leaf Node: The target
to delete has zero children. One Child: The target to delete only has one child.
Two Children: The target to delete has two child nodes. Removing a leaf node is
easy, we simply remove it. Deleting a node with one child is also relatively
easy, we simply remove it and link its parent to child of the node we deleted.
Removing a node with two children is more difficult, however, because this
creates two child nodes that need to be reconnected to the parent tree. We'll
see how to deal with this case in the third challenge. Additionally, you need to
be mindful of some edge cases when handling deletion. What if the tree is empty?
What if the node to delete is the root node? What if there are only two elements
in the tree? For now, let's handle the first case where we delete a leaf node.
