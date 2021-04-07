# Deal cards for FreeCell

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/deal-cards-for-freecell)

_FreeCell_ is the solitaire card game that Paul Alfille introduced to the PLATO
system in 1978. Jim Horne, at Microsoft, changed the name to FreeCell and
reimplemented the game for [DOS](https://rosettacode.org/wiki/DOS "DOS"), then
[Windows](https://rosettacode.org/wiki/Windows "Windows"). This version
introduced 32000 numbered deals.

As the game became popular, Jim Horne disclosed the algorithm, and other
implementations of FreeCell began to reproduce the Microsoft deals. These deals
are numbered from 1 to 32000. Newer versions from Microsoft have 1 million
deals, numbered from 1 to 1000000; some implementations allow numbers outside
that range.

The algorithm uses this
[linear congruential generator](https://rosettacode.org/wiki/linear%20congruential%20generator "linear congruential generator")
from Microsoft C:

- $state\_{n + 1} \\equiv 214013 \\times state\_n + 2531011 \\pmod{2^{31}}$
- $rand\_n = state\_n \\div 2^{16}$
- $rand\_n$ is in range 0 to 32767.

The algorithm follows:

1.  Seed the RNG with the number of the deal.
2.  Create an [array](https://rosettacode.org/wiki/array "array") of 52 cards:
    Ace of Clubs, Ace of Diamonds, Ace of Hearts, Ace of Spades, 2 of Clubs, 2
    of Diamonds, and so on through the ranks: Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    Jack, Queen, King. The array indexes are 0 to 51, with Ace of Clubs at 0,
    and King of Spades at 51.
3.  Until the array is empty:
4.  Choose a random card at index ≡ next random number (mod array length).

- Swap this random card with the last card of the array.
- Remove this random card from the array. (Array length goes down by 1.)
- Deal this random card.

6.  Deal all 52 cards, face up, across 8 columns. The first 8 cards go in 8
    columns, the next 8 cards go on the first 8 cards, and so on.

**Example:**

**Order to deal cards**

1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52

**Game #1**

```js
[
  ["JD", "2D", "9H", "JC", "5D", "7H", "7C", "5H"],
  ["KD", "KC", "9S", "5S", "AD", "QC", "KH", "3H"],
  ["2S", "KS", "9D", "QD", "JS", "AS", "AH", "3C"],
  ["4C", "5C", "TS", "QH", "4H", "AC", "4D", "7S"],
  ["3S", "TD", "4S", "TH", "8H", "2C", "JH", "7D"],
  ["6D", "8S", "8D", "QS", "6C", "3D", "8C", "TC"],
  ["6S", "9C", "2H", "6H"],
];
```

**Game #617**

```js
[
  ["7D", "AD", "5C", "3S", "5S", "8C", "2D", "AH"],
  ["TD", "7S", "QD", "AC", "6D", "8H", "AS", "KH"],
  ["TH", "QC", "3H", "9D", "6S", "8D", "3D", "TC"],
  ["KD", "5H", "9S", "3C", "8S", "7H", "4D", "JS"],
  ["4C", "QS", "9C", "9H", "7C", "6H", "2C", "2S"],
  ["4S", "TS", "2H", "5D", "JC", "6C", "JH", "QH"],
  ["JD", "KS", "KC", "4H"],
];
```
