# Remove Elements from a Linked List by Index

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/remove-elements-from-a-linked-list-by-index)

Before we move on to another data structure, let's get a couple of last bits of
practice with linked lists.

Let's write a `removeAt` method that removes the `element` at a given `index`.
The method should be called `removeAt(index)`. To remove an `element` at a
certain `index`, we'll need to keep a running count of each node as we move
along the linked list.

A common technique used to iterate through the elements of a linked list
involves a 'runner', or sentinel, that 'points' at the nodes that your code is
comparing. In our case, starting at the `head` of our list, we start with a
`currentIndex` variable that starts at `0`. The `currentIndex` should increment
by one for each node we pass.

Just like our `remove(element)` method, which
[we covered in a previous lesson](/learn/coding-interview-prep/data-structures/remove-elements-from-a-linked-list),
we need to be careful not to orphan the rest of our list when we remove the node
in our `removeAt(index)` method. We keep our nodes contiguous by making sure
that the node that has reference to the removed node has a reference to the next
node.
