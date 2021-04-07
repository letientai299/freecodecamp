# Remove an Element from a Max Heap

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/remove-an-element-from-a-max-heap)

Now that we can add elements to our heap let's see how we can remove elements.
Removing and inserting elements both require similar logic. In a max heap you
will usually want to remove the greatest value, so this involves simply
extracting it from the root of our tree. This will break the heap property of
our tree, so we must reestablish it in some way. Typically, for a max heap this
is done in the following way:

1.  Move the last element in the heap into the root position.
2.  If either child of the root is greater than it, swap the root with the child
    of greater value.
3.  Continue swapping until the parent is greater than both children or you
    reach the last level in the tree.
