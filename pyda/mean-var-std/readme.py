# ---
# jupyter:
#   jupytext:
#     text_representation:
#       extension: py
#       format_name: python
#       format_version: '1.1'
#       jupytext_version: 1.1.0
#   kernelspec:
#     display_name: Python 3
#     language: python
#     name: python3
# ---

# # Mean-Variance-Standard Deviation Calculator

# ## Note
#
# This is just about basic numpy operator, requires a bit of discovering.
#
# Time for this problem: 35m (5m for the code, 30 to make the test work in
# notebook format)


# ## Problem description
#
# Content of this section is copied and reformatted from [this
# repl.it](https://repl.it/github/freeCodeCamp/boilerplate-mean-variance-standard-deviation-calculator),
# so that you can understand what the code does (and I get to render a nice
# contentful page).
#
# ### Assigment
#
# Create a function named `calculate()` in `mean_var_std.py` that uses Numpy to
# output the mean, variance, standard deviation, max, min, and sum of the rows,
# columns, and elements in a 3 x 3 matrix.
#
# The input of the function should be a list containing 9 digits. The function
# should convert the list into a 3 x 3 Numpy array, and then return a dictionary
# containing the mean, variance, standard deviation, max, min, and sum along both
# axes and for the flattened matrix.
#
# The returned dictionary should follow this format:
#
# ```py
# {
#   'mean': [axis1, axis2, flattened],
#   'variance': [axis1, axis2, flattened],
#   'standard deviation': [axis1, axis2, flattened],
#   'max': [axis1, axis2, flattened],
#   'min': [axis1, axis2, flattened],
#   'sum': [axis1, axis2, flattened]
# }
# ```
#
# If a list containing less than 9 elements is passed into the function, it
# should raise a `ValueError` exception with the message: "List must contain
# nine numbers." The values in the returned dictionary should be lists and not
# Numpy arrays.
#
# For example, `calculate([0,1,2,3,4,5,6,7,8])` should return:
# ```py
# {
#   'mean': [[3.0, 4.0, 5.0], [1.0, 4.0, 7.0], 4.0],
#   'variance': [[6.0, 6.0, 6.0], [0.6666666666666666, 0.6666666666666666, 0.6666666666666666], 6.666666666666667],
#   'standard deviation': [[2.449489742783178, 2.449489742783178, 2.449489742783178], [0.816496580927726, 0.816496580927726, 0.816496580927726], 2.581988897471611],
#   'max': [[6, 7, 8], [2, 5, 8], 8],
#   'min': [[0, 1, 2], [0, 3, 6], 0],
#   'sum': [[9, 12, 15], [3, 12, 21], 36]
# }
# ```
#
# The unit tests for this project are in `test_module.py`.
#
# ### Development
#
# For development, you can use `main.py` to test your `calculate()` function.
# Click the "run" button and `main.py` will run.
#
# ### Testing
#
# We imported the tests from `test_module.py` to `main.py` for your convenience.
# The tests will run automatically whenever you hit the "run" button.
#
# ### Submitting
#
# Copy your project's URL and submit it to freeCodeCamp.

# ## Solution


from pprint import pprint

import numpy as np


def calculate(arr):
    if len(arr) != 9:
        raise ValueError("List must contain nine numbers.")

    m = np.array(arr).reshape([3, 3])
    r = {
        "mean": [m.mean(0).tolist(), m.mean(1).tolist(), m.mean()],
        "variance": [m.var(0).tolist(), m.var(1).tolist(), m.var()],
        "standard deviation": [m.std(0).tolist(), m.std(1).tolist(), m.std()],
        "max": [m.max(0).tolist(), m.max(1).tolist(), m.max()],
        "min": [m.min(0).tolist(), m.min(1).tolist(), m.min()],
        "sum": [m.sum(0).tolist(), m.sum(1).tolist(), m.sum()],
    }
    return r


pprint(calculate([i for i in range(0, 9)]))

# ## Test
#
# The test code is provided by FCC, in the repl.it link. I modified it a bit to
# make it runnable in notebook.


import unittest


class UnitTests(unittest.TestCase):
    def test_calculate(self):
        actual = calculate([2, 6, 2, 8, 4, 0, 1, 5, 7])
        expected = {
            "mean": [
                [3.6666666666666665, 5.0, 3.0],
                [3.3333333333333335, 4.0, 4.333333333333333],
                3.888888888888889,
            ],
            "variance": [
                [9.555555555555557, 0.6666666666666666, 8.666666666666666],
                [3.555555555555556, 10.666666666666666, 6.222222222222221],
                6.987654320987654,
            ],
            "standard deviation": [
                [3.091206165165235, 0.816496580927726, 2.943920288775949],
                [1.8856180831641267, 3.265986323710904, 2.494438257849294],
                2.6434171674156266,
            ],
            "max": [[8, 6, 7], [6, 8, 7], 8],
            "min": [[1, 4, 0], [2, 0, 1], 0],
            "sum": [[11, 15, 9], [10, 12, 13], 35],
        }
        self.assertAlmostEqual(
            actual,
            expected,
            "Expected different output when calling 'calculate()' with '[2,6,2,8,4,0,1,5,7]'",
        )

    def test_calculate2(self):
        actual = calculate([9, 1, 5, 3, 3, 3, 2, 9, 0])
        expected = {
            "mean": [
                [4.666666666666667, 4.333333333333333, 2.6666666666666665],
                [5.0, 3.0, 3.6666666666666665],
                3.888888888888889,
            ],
            "variance": [
                [9.555555555555555, 11.555555555555557, 4.222222222222222],
                [10.666666666666666, 0.0, 14.888888888888891],
                9.209876543209875,
            ],
            "standard deviation": [
                [3.0912061651652345, 3.39934634239519, 2.0548046676563256],
                [3.265986323710904, 0.0, 3.8586123009300755],
                3.0347778408328137,
            ],
            "max": [[9, 9, 5], [9, 3, 9], 9],
            "min": [[2, 1, 0], [1, 3, 0], 0],
            "sum": [[14, 13, 8], [15, 9, 11], 35],
        }
        self.assertAlmostEqual(
            actual,
            expected,
            "Expected different output when calling 'calculate()' with '[9,1,5,3,3,3,2,9,0]'",
        )

    def test_calculate_with_few_digits(self):
        self.assertRaisesRegex(
            ValueError,
            "List must contain nine numbers.",
            calculate,
            [
                2,
                6,
                2,
                8,
                4,
                0,
                1,
            ],
        )


if __name__ == "__main__":
    unittest.main(argv=["first-arg-is-ignored"], exit=False)
