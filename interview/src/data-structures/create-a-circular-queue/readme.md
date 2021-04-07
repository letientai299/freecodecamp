# Create a Circular Queue

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/create-a-circular-queue)

In this challenge you will be creating a Circular Queue. A circular queue is a
queue that writes to the end of a collection then begins overwriting itself at
the beginning of the collection. This type of data structure is useful in
certain situations. For example, a circular queue can be used for streaming
media. Once the queue is full, new media data will overwrite old data.

A good way to illustrate this concept is with an array of length `5`:

```js
[null, null, null, null, null]
 ^Read @ 0
 ^Write @ 0
```

Here the read and write are both at position `0`. Now the queue gets 3 new
records `a`, `b`, and `c`. Our queue now looks like:

```js
[a, b, c, null, null]
 ^Read @ 0
          ^Write @ 3
```

As the read head reads, it can remove values or keep them:

```js
[null, null, null, null, null]
                   ^Read @ 3
                   ^Write @ 3
```

Now we write the values `d`, `e`, and `f` to the queue. Once the write reaches
the end of the array it loops back to the beginning:

```js
[f, null, null, d, e]
                ^Read @ 3
    ^Write @ 1
```

This approach requires a constant amount of memory but allows files of a much
larger size to be processed.
