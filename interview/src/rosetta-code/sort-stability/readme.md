# Sort stability

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/sort-stability)

When sorting records in a table by a particular column or field, a
[stable sort](https://en.wikipedia.org/wiki/Stable_sort#Stability) will always
retain the relative order of records that have the same key.

For example, in this table of countries and cities, a stable sort on the
**second** column, the cities, would keep the US Birmingham above the UK
Birmingham. (Although an unstable sort _might_, in this case, place the US
Birmingham above the UK Birmingham, a stable sort routine would _guarantee_ it).

UK London US New York US Birmingham UK Birmingham

Similarly, stable sorting on just the first column would generate "UK London" as
the first item and "US Birmingham" as the last item (since the order of the
elements having the same first word – "UK" or "US" – would be maintained).
