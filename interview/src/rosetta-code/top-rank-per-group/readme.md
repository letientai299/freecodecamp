# Top rank per group

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/top-rank-per-group)

Find the top `n` ranked data in each group, where `n` is provided as a
parameter. Name of the rank and the group are also provided as parameter.

Given the following data:

```js
testData1 = [
  { name: "Tyler Bennett", id: "E10297", salary: 32000, dept: "D101" },
  { name: "John Rappl", id: "E21437", salary: 47000, dept: "D050" },
  { name: "George Woltman", id: "E00127", salary: 53500, dept: "D101" },
  { name: "Adam Smith", id: "E63535", salary: 18000, dept: "D202" },
  { name: "Claire Buckman", id: "E39876", salary: 27800, dept: "D202" },
  { name: "David McClellan", id: "E04242", salary: 41500, dept: "D101" },
  { name: "Rich Holcomb", id: "E01234", salary: 49500, dept: "D202" },
  { name: "Nathan Adams", id: "E41298", salary: 21900, dept: "D050" },
  { name: "Richard Potter", id: "E43128", salary: 15900, dept: "D101" },
  { name: "David Motsinger", id: "E27002", salary: 19250, dept: "D202" },
  { name: "Tim Sampair", id: "E03033", salary: 27000, dept: "D101" },
  { name: "Kim Arlich", id: "E10001", salary: 57000, dept: "D190" },
  { name: "Timothy Grove", id: "E16398", salary: 29900, dept: "D190" },
];
```

One could rank top 10 employees in each department by calling:

```js
topRankPerGroup(10, testData1, "dept", "salary");
```

Given the following data:

```js
testData2 = [
  { name: "Friday 13th", genre: "horror", rating: 9.9 },
  { name: "Nightmare on Elm's Street", genre: "horror", rating: 5.7 },
  { name: "Titanic", genre: "drama", rating: 7.3 },
  { name: "Maze Runner", genre: "scifi", rating: 7.1 },
  { name: "Blade runner", genre: "scifi", rating: 8.9 },
];
```

One could rank the top-rated movie in each genre by calling:

```js
topRankPerGroup(1, testData2, "genre", "rating");
```

The function should return an array with an array for each group containing the
top `n` objects.

For example, given data:

```js
[
  { name: "Claire Buckman", id: "E39876", salary: 27800, dept: "D101" },
  { name: "Rich Holcomb", id: "E01234", salary: 49500, dept: "D050" },
  { name: "David Motsinger", id: "E27002", salary: 19250, dept: "D050" },
  { name: "Tim Sampair", id: "E03033", salary: 27000, dept: "D101" },
  { name: "Kim Arlich", id: "E10001", salary: 57000, dept: "D050" },
  { name: "Timothy Grove", id: "E16398", salary: 29900, dept: "D101" },
];
```

Top two ranking employees in each department by salary would be:

```js
[
  [
    { name: "Kim Arlich", id: "E10001", salary: 57000, dept: "D050" },
    { name: "Rich Holcomb", id: "E01234", salary: 49500, dept: "D050" },
  ],
  [
    { name: "Timothy Grove", id: "E16398", salary: 29900, dept: "D101" },
    { name: "Claire Buckman", id: "E39876", salary: 27800, dept: "D101" },
  ],
];
```
