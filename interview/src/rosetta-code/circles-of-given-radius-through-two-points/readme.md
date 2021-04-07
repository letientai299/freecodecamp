# Circles of given radius through two points

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/circles-of-given-radius-through-two-points)

Given two points on a plane and a radius, usually two circles of given radius
can be drawn through the points.

**Exceptions:**

- A radius of zero should be treated as never describing circles (except in the
  case where the points are coincident).
- If the points are coincident then an infinite number of circles with the point
  on their circumference can be drawn, unless the radius is equal to zero as
  well which then collapses the circles to a point.
- If the points form a diameter then return a single circle.
- If the points are too far apart then no circles can be drawn.
