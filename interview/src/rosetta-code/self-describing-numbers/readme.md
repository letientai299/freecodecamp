# Self Describing Numbers

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/self-describing-numbers)

There are several so-called "self describing" or
["self-descriptive"](https://en.wikipedia.org/wiki/Self-descriptive_number)
integers.

An integer is said to be "self-describing" if it has the property that, when
digit positions are labeled 0 to N-1, the digit in each position is equal to the
number of times that digit appears in the number.

For example, **2020** is a four-digit self describing number:

- position 0 has value 2 and there are two 0s in the number;
- position 1 has value 0 and there are no 1s in the number;
- position 2 has value 2 and there are two 2s;
- position 3 has value 0 and there are zero 3s;

Self-describing numbers < 100,000,000 are: 1210, 2020, 21200, 3211000, 42101000.
