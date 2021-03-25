# freeCodeCamp project solutions

[![GH Pages](https://github.com/letientai299/freecodecamp/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/letientai299/freecodecamp/actions/workflows/gh-pages.yml)
[![GitHub stars](https://img.shields.io/github/stars/letientai299/freecodecamp?style=social&label=Star&maxAge=2592000)](https://GitHub.com/letientai299/freecodecamp/stargazers/)

This repo contains my final projects solutions for web-related cources I've done
on [freeCodeCamp][fcc] in 2021.

- [Visit here to see actual web pages.](https://letientai.io/freecodecamp/)
- [See my timeline on freecodecamp here](https://www.freecodecamp.org/letientai299):
  start in 2021/03/11, finish in TBD
- If you want to play around with this repo locally, see
  [local setup guide](#local-setup)

## Table of contents

<!-- toc -->

- [Course](#course)
  - [JavaScript Algorithms and Data Structures](#javascript-algorithms-and-data-structures)
  - [Responsive Web Design](#responsive-web-design)
  - [Data Visualization](#data-visualization)
  - [Quality assurange](#quality-assurange)
  - [Scientific Computing with Python](#scientific-computing-with-python)
  - [Data Analysis with Python](#data-analysis-with-python)
- [Local setup](#local-setup)

<!-- tocstop -->

> TODO:
>
> - get all the certs
> - make header clickable and generate anchor links

## Course

### JavaScript Algorithms and Data Structures

- [Cource link][fcc_algo]
- [Cert](https://www.freecodecamp.org/certification/letientai299/javascript-algorithms-and-data-structures)
- Total time: 10h

This is easy if since I already have
[some experience with leetcode](https://github.com/letientai299/leetcode), just
need to get a bit more familiar with data structure in JS. Thankfully, JS has
strong support for functinal programming.

### Responsive Web Design

- [Course link][fcc_web]
- [Cert](https://www.freecodecamp.org/certification/letientai299/responsive-web-design)
- Total time: 35h

The course is very helpful, I learned many things: Flex Box, Grid, media
query...

Except the Documentation page (Markdown Guide), other 4 projects is hand-written
HTML, CSS and JS. It feels a bit weird to do that in 2021, when there are too
many JS frameworks available. But on the other hand, it feels cool to finally
able to build such sites.

| Task                                                    | Site                               |
| ------------------------------------------------------- | ---------------------------------- |
| [Build a Tribute Page][fcc_web_tribute]                 | [./web/tribute](./web/tribute)     |
| [Build a Survey Form][fcc_web_survey]                   | [./web/survey](./web/survey)       |
| [Build a Product Landing Page][fcc_web_landing]         | [./web/landing](./web/landing)     |
| [Build a Technical Documentation Page][fcc_web_doc]     | [./web/doc](./web/doc)             |
| [Build a Personal Portfolio Webpage][fcc_web_portfolio] | [./web/portfolio](./web/portfolio) |

### Data Visualization

- [Course link][fcc_web]
- [Cert](https://www.freecodecamp.org/certification/letientai299/data-visualization)
- Total time: 18h

`d3` is awesome! I don't know how many times I have that thought when working on
this cert. There's a lot of things in and behind it. No wonder why there's so
many books on `d3`. I will definitely use it for my other (real) data
visualization projects.

Beside many things I've tried with these projects, I feel like my code for
iterate through data and rendering the chart is not efficient. I need to learn
more about JS performance. The code could also be structured better.

| Task                                                          | Site                                 |
| ------------------------------------------------------------- | ------------------------------------ |
| [Visualize Data with a Bar Char][fcc_d3_bar]                  | [./d3/bar](./d3/bar)                 |
| [Visualize Data with a Scatterplot Graph][fcc_d3_scatterplot] | [./d3/scatterplot](./d3/scatterplot) |
| [Visualize Data with a Heat Map][fcc_d3_heat]                 | [./d3/heat](./d3/heat)               |
| [Visualize Data with a Choropleth Map][fcc_d3_choropleth]     | [./d3/choropleth](./d3/choropleth)   |
| [Visualize Data with a Treemap Diagram][fcc_d3_treemap]       | [./d3/treemap](./d3/treemap)         |

### Quality assurange

- [Course link][fcc_qa]
- Cert: TODO

This course requires more thought, so see [its note here](./qa).

| Task                                             | Site                               |
| ------------------------------------------------ | ---------------------------------- |
| [Metric-Imperial Converter][fcc_qa_converter]    | [./qa/converter](./qa/converter)   |
| [Issue Tracker][fcc_qa_tracker]                  | [./qa/tracker](./qa/tracker)       |
| [Personal Library][fcc_qa_lib]                   | [./qa/lib](./qa/lib)               |
| [Sudoku Solver][fcc_qa_sudoku]                   | [./qa/sudoku](./qa/sudoku)         |
| [American British Translator][fcc_qa_translator] | [./qa/translator](./qa/translator) |

### Scientific Computing with Python

- [Course link][fcc_py]
- [Cert](https://www.freecodecamp.org/certification/letientai299/scientific-computing-with-python-v7)
- Time:
  - Course: 20m, pretty quick since I'm experienced and there's only 56 multi
    choice questions.
  - Problems: 4h, need time to learn Python OOP

| Task                                         | Code (on Github)                                                                                                     |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [Arithemetic Formater][fcc_py_fmt]           | [arithmetic_arranger.py](https://github.com/letientai299/freecodecamp/blob/master/python/fmt/arithmetic_arranger.py) |
| [Time Calculator][fcc_py_time]               | [time_calculator.py](https://github.com/letientai299/freecodecamp/blob/master/python/time/time_calculator.py)        |
| [Budget App][fcc_py_budget]                  | [budget.py](https://github.com/letientai299/freecodecamp/blob/master/python/budget/budget.py)                        |
| [Polygon Area Calculator][fcc_py_area]       | [shape_calculator.py](https://github.com/letientai299/freecodecamp/blob/master/python/area/shape_calculator.py)      |
| [Probability Calculator][fcc_py_probability] | [prob_calculator.py](https://github.com/letientai299/freecodecamp/blob/master/python/probability/prob_calculator.py) |

### Data Analysis with Python

- [Course link](https://www.freecodecamp.org/learn/data-analysis-with-python/)

| Task                                            | Site                                                           |
| ----------------------------------------------- | -------------------------------------------------------------- |
| [Mean-Variance-Standard Deviation Calculator]() | [./pyda/mean-var-std/readme.md](./pyda/mean-var-std/readme.md) |
| [Demographic Data Analyzer]()                   | []()                                                           |
| [Medical Data Visualizer]()                     | []()                                                           |
| [Page View Time Series Visualizer]()            | []()                                                           |
| [Sea Level Predictor]()                         | []()                                                           |

## Local setup

> TODO

<!-- ref -->

[fcc]: https://www.freecodecamp.org/
[fcc_algo]:
  https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/
[fcc_web]: https://www.freecodecamp.org/learn/responsive-web-design/
[fcc_web_tribute]:
  https://www.freecodecamp.org/learn/responsive-web-design/responsive-web-design-projects/build-a-tribute-page
[fcc_web_survey]:
  https://www.freecodecamp.org/learn/responsive-web-design/responsive-web-design-projects/build-a-survey-form
[fcc_web_landing]:
  https://www.freecodecamp.org/learn/responsive-web-design/responsive-web-design-projects/build-a-product-landing-page
[fcc_web_doc]:
  https://www.freecodecamp.org/learn/responsive-web-design/responsive-web-design-projects/build-a-technical-documentation-page
[fcc_web_portfolio]:
  https://www.freecodecamp.org/learn/responsive-web-design/responsive-web-design-projects/build-a-personal-portfolio-webpage
[fcc_d3]: https://www.freecodecamp.org/learn/data-visualization/
[fcc_d3_bar]:
  https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-bar-chart
[fcc_d3_scatterplot]:
  https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-scatterplot-graph
[fcc_d3_heat]:
  https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-heat-map
[fcc_d3_choropleth]:
  https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-choropleth-map
[fcc_d3_treemap]:
  https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-treemap-diagram
[fcc_qa]: https://www.freecodecamp.org/learn/quality-assurance
[fcc_qa_converter]:
  https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/metric-imperial-converter
[fcc_qa_tracker]:
  https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/issue-tracker
[fcc_qa_lib]:
  https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/personal-library
[fcc_qa_sudoku]:
  https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/sudoku-solver
[fcc_qa_translator]:
  https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/american-british-translator
[fcc_py]: https://www.freecodecamp.org/learn/scientific-computing-with-python/
[fcc_py_fmt]:
  https://www.freecodecamp.org/learn/scientific-computing-with-python/scientific-computing-with-python-projects/arithmetic-formatter
[fcc_py_time]:
  https://www.freecodecamp.org/learn/scientific-computing-with-python/scientific-computing-with-python-projects/time-calculator
[fcc_py_budget]:
  https://www.freecodecamp.org/learn/scientific-computing-with-python/scientific-computing-with-python-projects/budget-app
[fcc_py_area]:
  https://www.freecodecamp.org/learn/scientific-computing-with-python/scientific-computing-with-python-projects/polygon-area-calculator
[fcc_py_probability]:
  https://www.freecodecamp.org/learn/scientific-computing-with-python/scientific-computing-with-python-projects/probability-calculator
