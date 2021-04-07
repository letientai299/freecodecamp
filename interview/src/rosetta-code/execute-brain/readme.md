# Execute Brain****

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/execute-brain)

Write a function to implement a Brain\*\*\*\* interpreter. The function will
take a string as a parameter and should return a string as the output. More
details are given below:

RCBF is a set of
[Brainf\*\*\*](https://rosettacode.org/wiki/Brainf*** "Brainf***") compilers and
interpreters written for Rosetta Code in a variety of languages.

Below are links to each of the versions of RCBF.

An implementation need only properly implement the following instructions:

| Command | Description                                                            |
| ------- | ---------------------------------------------------------------------- |
| `>`     | Move the pointer to the right                                          |
| `<`     | Move the pointer to the left                                           |
| `+`     | Increment the memory cell under the pointer                            |
| `-`     | Decrement the memory cell under the pointer                            |
| `.`     | Output the character signified by the cell at the pointer              |
| `,`     | Input a character and store it in the cell at the pointer              |
| `[`     | Jump past the matching `]` if the cell under the pointer is 0          |
| `]`     | Jump back to the matching `[` if the cell under the pointer is nonzero |

Any cell size is allowed, EOF (_E_nd-\_O_\-\_F_ile) support is optional, as is
whether you have bounded or unbounded memory.
