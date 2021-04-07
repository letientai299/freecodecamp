# Heronian triangles

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/heronian-triangles)

[Hero's formula](https://en.wikipedia.org/wiki/Heron's%20formula "wp: Heron's formula")
for the area of a triangle given the length of its three sides `a`, `b`, and `c`
is given by:

$A = \\sqrt{s(s-a)(s-b)(s-c)},$

where `s` is half the perimeter of the triangle; that is,

$s=\\frac{a+b+c}{2}.$

Heronian triangles are triangles whose sides and area are all integers.

An example is the triangle with sides `3, 4, 5` whose area is `6` (and whose
perimeter is `12`).

Note that any triangle whose sides are all an integer multiple of `3, 4, 5`;
such as `6, 8, 10,` will also be a Heronian triangle.

Define a Primitive Heronian triangle as a Heronian triangle where the greatest
common divisor

of all three sides is `1` (unity).

This will exclude, for example, triangle `6, 8, 10.`
