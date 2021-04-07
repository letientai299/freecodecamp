# Tokenize a string with escaping

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/tokenize-a-string-with-escaping)

Write a function or program that can split a string at each non-escaped
occurrence of a separator character.

It should accept three input parameters:

- The **string**
- The **separator character**
- The **escape character**

It should output a list of strings.

Rules for splitting:

- The fields that were separated by the separators, become the elements of the
  output list.
- Empty fields should be preserved, even at the start and end.

Rules for escaping:

- "Escaped" means preceded by an occurrence of the escape character that is not
  already escaped itself.
- When the escape character precedes a character that has no special meaning, it
  still counts as an escape (but does not do anything special).
- Each occurrences of the escape character that was used to escape something,
  should not become part of the output.

Demonstrate that your function satisfies the following test-case:

Given the string

one^|uno||three^^^^|four^^^|^cuatro|

and using `|` as a separator and `^` as escape character, your function should
output the following array:

\['one|uno', '', 'three^^', 'four^|cuatro', ''\]
