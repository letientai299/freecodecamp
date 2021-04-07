# Remove Elements from a Linked List

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/remove-elements-from-a-linked-list)

The next important method that any implementation of a linked list will need is
a `remove` method. This method should take the element we want to remove as an
argument, and then search the list to find and remove the node that contains
that element.

Whenever we remove a node from a linked list, it's important that we don't
accidentally orphan the rest of the list in doing so. Recall that every node's
`next` property points to the node that follows it in the list. If we're
removing the middle element, say, we'll want to make sure that we have a
connection from that element's previous node's `next` property to the middle
element's `next` property (which is the next node in the list!)

This might sound really confusing, so let's return to the conga line example so
we have a good conceptual model. Picture yourself in a conga line, and the
person directly in front of you leaves the line. The person who just left the
line no longer has her hands on anyone in line--and you no longer have your
hands on the person that left. You step forward and put your hands on next
person you see.

If the element we wish to remove is the `head` element, we reassign the `head`
to the second node of the linked list.
