# Create a Queue Class

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/create-a-queue-class)

Like stacks, queues are a collection of elements. But unlike stacks, queues
follow the FIFO (First-In First-Out) principle. Elements added to a queue are
pushed to the tail, or the end, of the queue, and only the element at the front
of the queue is allowed to be removed.

We could use an array to represent a queue, but just like stacks, we want to
limit the amount of control we have over our queues.

The two main methods of a queue class is the enqueue and the dequeue method. The
enqueue method pushes an element to the tail of the queue, and the dequeue
method removes and returns the element at the front of the queue. Other useful
methods are the front, size, and isEmpty methods.
