# Demographic Data Analyzer

## Problem description

Content of this section is copied and reformatted from [this
repl.it](https://repl.it/github/freeCodeCamp/boilerplate-demographic-data-analyzer),
provided by FCC
[here](https://www.freecodecamp.org/learn/data-analysis-with-python/data-analysis-with-python-projects/demographic-data-analyzer).

### Assignment

In this challenge you must analyze demographic data using Pandas. You are given
a dataset of demographic data that was extracted from the 1994 Census database.
Here is a sample of what the data looks like:

|     | age | workclass        | fnlwgt | education | education-num | marital-status     | occupation        | relationship  | race  | sex    | capital-gain | capital-loss | hours-per-week | native-country | salary |
| --: | --: | :--------------- | -----: | :-------- | ------------: | :----------------- | :---------------- | :------------ | :---- | :----- | -----------: | -----------: | -------------: | :------------- | :----- |
|   0 |  39 | State-gov        |  77516 | Bachelors |            13 | Never-married      | Adm-clerical      | Not-in-family | White | Male   |         2174 |            0 |             40 | United-States  | <=50K  |
|   1 |  50 | Self-emp-not-inc |  83311 | Bachelors |            13 | Married-civ-spouse | Exec-managerial   | Husband       | White | Male   |            0 |            0 |             13 | United-States  | <=50K  |
|   2 |  38 | Private          | 215646 | HS-grad   |             9 | Divorced           | Handlers-cleaners | Not-in-family | White | Male   |            0 |            0 |             40 | United-States  | <=50K  |
|   3 |  53 | Private          | 234721 | 11th      |             7 | Married-civ-spouse | Handlers-cleaners | Husband       | Black | Male   |            0 |            0 |             40 | United-States  | <=50K  |
|   4 |  28 | Private          | 338409 | Bachelors |            13 | Married-civ-spouse | Prof-specialty    | Wife          | Black | Female |            0 |            0 |             40 | Cuba           | <=50K  |

You must use Pandas to answer the following questions:

- How many people of each race are represented in this dataset? This should be a
  Pandas series with race names as the index labels. (`race` column)
- What is the average age of men?
- What is the percentage of people who have a Bachelor's degree?
- What percentage of people with advanced education (`Bachelors`, `Masters`, or
  `Doctorate`) make more than 50K?
- What percentage of people without advanced education make more than 50K?
- What is the minimum number of hours a person works per week?
- What percentage of the people who work the minimum number of hours per week
  have a salary of more than 50K?
- What country has the highest percentage of people that earn >50K and what is
  that percentage?
- Identify the most popular occupation for those who earn >50K in India.

Use the starter code in the file `demographic_data_anaylizer`. Update the code
so all variables set to "None" are set to the appropriate calculation or code.
Round all decimals to the nearest tenth.

Unit tests are written for you under `test_module.py`.

### Development

For development, you can use `main.py` to test your functions. Click the "run"
button and `main.py` will run.

### Testing

We imported the tests from `test_module.py` to `main.py` for your convenience.
The tests will run automatically whenever you hit the "run" button.

### Submitting

Copy your project's URL and submit it to freeCodeCamp.

### Dataset Source

Dua, D. and Graff, C. (2019). [UCI Machine Learning
Repository](http://archive.ics.uci.edu/ml). Irvine, CA: University of California, School of
Information and Computer Science.

## Note

OK, this is a hard one, because I haven't really learn pandas. Need to google
a lot.

Total time: 2h

## Solution


```python
import pandas as pd
```


```python
def calculate_demographic_data(print_data=True):
    # Read data from file
    df = pd.read_csv("./adult.data.csv")

    # How many of each race are represented in this dataset? This should be a
    # Pandas series with race names as the index labels.
    race_count = df["race"].value_counts()

    # What is the average age of men?
    average_age_men = round(df.loc[df["sex"] == "Male", "age"].mean(), 1)

    # What is the percentage of people who have a Bachelor's degree?
    percentage_bachelors = round(
        100 * df.loc[df["education"] == "Bachelors"].size / df.size,
        1,
    )

    # What percentage of people with advanced education (`Bachelors`, `Masters`,
    # or `Doctorate`) make more than 50K?
    # What percentage of people without advanced education make more than 50K?

    # with and without `Bachelors`, `Masters`, or `Doctorate`
    higher_education = df.loc[
        df["education"].isin(["Bachelors", "Masters", "Doctorate"])
    ]
    lower_education = df.loc[
        ~df["education"].isin(["Bachelors", "Masters", "Doctorate"])
    ]

    # percentage with salary >50K
    higher_education_rich = round(
        100
        * higher_education.loc[higher_education["salary"] == ">50K"].size
        / higher_education.size,
        1,
    )

    lower_education_rich = round(
        100
        * lower_education.loc[lower_education["salary"] == ">50K"].size
        / lower_education.size,
        1,
    )

    # What is the minimum number of hours a person works per week
    # (hours-per-week feature)?
    min_work_hours = df["hours-per-week"].min()

    # What percentage of the people who work the minimum number of hours per
    # week have a salary of >50K?
    num_min_workers = df.loc[df["hours-per-week"] == min_work_hours]
    rich_percentage = round(
        100
        * num_min_workers.loc[num_min_workers["salary"] == ">50K"].size
        / num_min_workers.size,
        1,
    )

    # What country has the highest percentage of people that earn >50K?
    highest_country = (
        df[["salary", "native-country"]]
        .groupby("native-country")
        .apply(lambda g: g.loc[g["salary"] == ">50K"].size / g.size * 100)
    )

    highest_earning_country = highest_country.idxmax()
    highest_earning_country_percentage = round(highest_country.max(), 1)

    # Identify the most popular occupation for those who earn >50K in India.
    top_IN_occupation = (
        df.loc[(df["native-country"] == "India") & (df["salary"] == ">50K")][
            "occupation"
        ]
        .value_counts()
        .idxmax()
    )

    # DO NOT MODIFY BELOW THIS LINE

    if print_data:
        print("Number of each race:\n", race_count)
        print("Average age of men:", average_age_men)
        print(f"Percentage with Bachelors degrees: {percentage_bachelors}%")
        print(
            f"Percentage with higher education that earn >50K: {higher_education_rich}%"
        )
        print(
            f"Percentage without higher education that earn >50K: {lower_education_rich}%"
        )
        print(f"Min work time: {min_work_hours} hours/week")
        print(
            f"Percentage of rich among those who work fewest hours: {rich_percentage}%"
        )
        print(
            "Country with highest percentage of rich:", highest_earning_country
        )
        print(
            f"Highest percentage of rich people in country: {highest_earning_country_percentage}%"
        )
        print("Top occupations in India:", top_IN_occupation)

    return {
        "race_count": race_count,
        "average_age_men": average_age_men,
        "percentage_bachelors": percentage_bachelors,
        "higher_education_rich": higher_education_rich,
        "lower_education_rich": lower_education_rich,
        "min_work_hours": min_work_hours,
        "rich_percentage": rich_percentage,
        "highest_earning_country": highest_earning_country,
        "highest_earning_country_percentage": highest_earning_country_percentage,
        "top_IN_occupation": top_IN_occupation,
    }
```


```python
calculate_demographic_data(False)
```




    {'race_count': White                 27816
     Black                  3124
     Asian-Pac-Islander     1039
     Amer-Indian-Eskimo      311
     Other                   271
     Name: race, dtype: int64,
     'average_age_men': 39.4,
     'percentage_bachelors': 16.4,
     'higher_education_rich': 46.5,
     'lower_education_rich': 17.4,
     'min_work_hours': 1,
     'rich_percentage': 10.0,
     'highest_earning_country': 'Iran',
     'highest_earning_country_percentage': 41.9,
     'top_IN_occupation': 'Prof-specialty'}



## Test


```python
import unittest
```


```python
class DemographicAnalyzerTestCase(unittest.TestCase):
    def setUp(self):
        self.data = calculate_demographic_data(print_data=False)

    def test_race_count(self):
        actual = self.data["race_count"].tolist()
        expected = [27816, 3124, 1039, 311, 271]
        self.assertAlmostEqual(
            actual,
            expected,
            msg="Expected race count values to be [27816, 3124, 1039, 311, 271]",
        )

    def test_average_age_men(self):
        actual = self.data["average_age_men"]
        expected = 39.4
        self.assertAlmostEqual(
            actual,
            expected,
            msg="Expected different value for average age of men.",
        )

    def test_percentage_bachelors(self):
        actual = self.data["percentage_bachelors"]
        expected = 16.4
        self.assertAlmostEqual(
            actual,
            expected,
            msg="Expected different value for percentage with Bachelors degrees.",
        )

    def test_higher_education_rich(self):
        actual = self.data["higher_education_rich"]
        expected = 46.5
        self.assertAlmostEqual(
            actual,
            expected,
            msg="Expected different value for percentage with higher education that earn >50K.",
        )

    def test_lower_education_rich(self):
        actual = self.data["lower_education_rich"]
        expected = 17.4
        self.assertAlmostEqual(
            actual,
            expected,
            msg="Expected different value for percentage without higher education that earn >50K.",
        )

    def test_min_work_hours(self):
        actual = self.data["min_work_hours"]
        expected = 1
        self.assertAlmostEqual(
            actual,
            expected,
            msg="Expected different value for minimum work hours.",
        )

    def test_rich_percentage(self):
        actual = self.data["rich_percentage"]
        expected = 10
        self.assertAlmostEqual(
            actual,
            expected,
            msg="Expected different value for percentage of rich among those who work fewest hours.",
        )

    def test_highest_earning_country(self):
        actual = self.data["highest_earning_country"]
        expected = "Iran"
        self.assertEqual(
            actual,
            expected,
            "Expected different value for highest earning country.",
        )

    def test_highest_earning_country_percentage(self):
        actual = self.data["highest_earning_country_percentage"]
        expected = 41.9
        self.assertAlmostEqual(
            actual,
            expected,
            msg="Expected different value for heighest earning country percentage.",
        )

    def test_top_IN_occupation(self):
        actual = self.data["top_IN_occupation"]
        expected = "Prof-specialty"
        self.assertEqual(
            actual,
            expected,
            "Expected different value for top occupations in India.",
        )
```


```python
if __name__ == "__main__":
    unittest.main(argv=["first-arg-is-ignored"], exit=False)
```

    ..........
    ----------------------------------------------------------------------
    Ran 10 tests in 1.285s
    
    OK

