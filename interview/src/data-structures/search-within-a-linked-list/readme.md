# Search within a Linked List

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/search-within-a-linked-list)

Let's add a few more useful methods to our linked list class. Wouldn't it be
useful if we could tell if our list was empty or not, as with our `Stack` and
`Queue` classes?

We should also be able to find specific elements in our linked list. Traversing
through data structures is something you'll want to get a lot of practice with!
Let's create an `indexOf` method that takes an `element` as an argument, and
returns that element's `index` in the linked list. If the element is not found
in the linked list, return `-1`.

Let's also implement a method that does the opposite: an `elementAt` method that
takes an `index` as an argument and returns the `element` at the given `index`.
If no `element` is found, return `undefined`.
