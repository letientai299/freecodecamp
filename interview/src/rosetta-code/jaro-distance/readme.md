# Jaro distance

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/jaro-distance)

The Jaro distance is a measure of similarity between two strings. The higher the
Jaro distance for two strings is, the more similar the strings are. The score is
normalized such that `0` equates to no similarity and `1` is an exact match.

**Definition**

The Jaro distance \\( d_j \\) of two given strings \\(s_1\\) and \\(s_2\\) is

\\begin{align}d_j = \\begin{cases}0& & \\text{if }m=0 \\\\\\\\{\\frac
{1}{3}}\\left({\\frac {m}{|s\_{1}|}}+{\\frac {m}{|s\_{2}|}}+{\\frac
{m-t}{m}}\\right)& & \\text{otherwise}\\end{cases}\\end{align}

Where:

- \\(m\\) is the number of _matching characters_;
- \\(t\\) is half the number of _transpositions_.

Two characters from \\(s_1\\) and \\(s_2\\) respectively, are considered
_matching_ only if they are the same and not farther than
\\(\\left\\lfloor\\frac{\\max(|s_1|,|s_2|)}{2}\\right\\rfloor-1\\).

Each character of \\(s_1\\) is compared with all its matching characters in
\\(s_2\\) . The number of matching (but different sequence order) characters
divided by 2 defines the number of _transpositions_.

**Example**

Given the strings \\(s_1\\) _DWAYNE_ and \\(s_2\\) _DUANE_ we find:

- \\(m = 4\\)
- \\(|s_1| = 6\\)
- \\(|s_2| = 5\\)
- \\(t = 0\\)

We find a Jaro score of: \\(d_j = \\frac{1}{3}\\left(\\frac{4}{6} +
\\frac{4}{5} + \\frac{4-0}{4}\\right) = 0.822\\).
