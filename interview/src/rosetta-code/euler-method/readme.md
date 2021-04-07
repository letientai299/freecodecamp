# Euler method

[FCC link](https://www.freecodecamp.org/learn/coding-interview-prep/rosetta-code/euler-method)

Euler's method numerically approximates solutions of first-order ordinary
differential equations (ODEs) with a given initial value. It is an explicit
method for solving initial value problems (IVPs), as described in
[the wikipedia page](https://en.wikipedia.org/wiki/Euler%20method "wp: Euler method").

The ODE has to be provided in the following form:

- $\\frac{dy(t)}{dt} = f(t,y(t))$

with an initial value

- $y(t\_0) = y\_0$

To get a numeric solution, we replace the derivative on the LHS with a finite
difference approximation:

- $\\frac{dy(t)}{dt} \\approx \\frac{y(t+h)-y(t)}{h}$

then solve for $y(t+h)$:

- $y(t+h) \\approx y(t) + h \\, \\frac{dy(t)}{dt}$

which is the same as

- $y(t+h) \\approx y(t) + h \\, f(t,y(t))$

The iterative solution rule is then:

- $y\_{n+1} = y\_n + h \\, f(t\_n, y\_n)$

where $h$ is the step size, the most relevant parameter for accuracy of the
solution. A smaller step size increases accuracy but also the computation cost,
so it has always has to be hand-picked according to the problem at hand.

**Example: Newton's Cooling Law**

Newton's cooling law describes how an object of initial temperature
$T(t\_0) = T\_0$ cools down in an environment of temperature $T\_R$:

- $\\frac{dT(t)}{dt} = -k \\, \\Delta T$

or

- $\\frac{dT(t)}{dt} = -k \\, (T(t) - T\_R)$

It says that the cooling rate $\\frac{dT(t)}{dt}$ of the object is proportional
to the current temperature difference $\\Delta T = (T(t) - T\_R)$ to the
surrounding environment.

The analytical solution, which we will compare to the numerical approximation,
is

- $T(t) = T\_R + (T\_0 - T\_R) \\; e^{-k t}$
