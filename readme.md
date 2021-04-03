# freeCodeCamp solutions

[![GH Pages](https://github.com/letientai299/freecodecamp/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/letientai299/freecodecamp/actions/workflows/gh-pages.yml)
[![Deploy Heroku](https://github.com/letientai299/freecodecamp/actions/workflows/deploy-heroku.yml/badge.svg)](https://github.com/letientai299/freecodecamp/actions/workflows/deploy-heroku.yml)
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
  - [Scientific Computing with Python](#scientific-computing-with-python)
  - [Data Analysis with Python](#data-analysis-with-python)
  - [APIs and Microservices](#apis-and-microservices)
  - [Quality assurange](#quality-assurange)
  - [Information Security](#information-security)
  - [Coding Interview Prep](#coding-interview-prep)
  - [Machine Learning with Python](#machine-learning-with-python)
  - [Front End Development Libraries](#front-end-development-libraries)
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
- [Cert](https://www.freecodecamp.org/certification/letientai299/data-analysis-with-python-v7)
- Total time: 13h
  - 8.5h for final projects.
  - 4.5h for the course, but I spent probably only 30m on the course content
    (skipped videos, guest the answers), and use the rest to write scripts for
    converting Python scripts to Jupyter Notebook, HTML and markdown, then live
    serving the HTML as I editing the Python script. What's a waste of time,
    yes. But in the end, we have some nice pages to view.

There's a lot of things to I've yet to learn. Don't count on my data analysis
skill with Pandas, Numpy, ... I think I'm just good at reading documents and
guessing.

Off topic, I used to try Jupyter when it first came out, and used to think about
seriously learn Data Analysis. However, I couldn't edit code on the web
interface (because of Vim, but I'm not complain), so I drop that thought. I
can't understand why web editing become so popular now. Perhaps many people are
OK inefficient workflows.

| Task                                                         | Site                                        |
| ------------------------------------------------------------ | ------------------------------------------- |
| [Mean-Variance-Standard Deviation Calculator][fcc_pyda_mean] | [./pyda/mean-var-std/](./pyda/mean-var-std) |
| [Demographic Data Analyzer][fcc_pyda_demographic]            | [./pyda/demographic](./pyda/demographic)    |
| [Medical Data Visualizer][fcc_pyda_plot]                     | [./pyda/plot](./pyda/plot)                  |
| [Page View Time Series Visualizer][fcc_pyda_time]            | [./pyda/time](./pyda/time)                  |
| [Sea Level Predictor][fcc_pyda_sea]                          | [./pyda/sea](./pyda/sea)                    |

### APIs and Microservices

- [Course link](https://www.freecodecamp.org/learn/apis-and-microservices/#basic-node-and-express)
- [Cert](https://www.freecodecamp.org/certification/letientai299/apis-and-microservices)
- Time:
  - **15.5h** to setting up local development, heroku site, Github Actions, then
    benchmark and try [nodejs cluster](https://nodejs.org/api/cluster.html) to
    see if it could be faster. The result of this effort is used for other
    courses like QA, infosec, so perhaps it's not fair for this course to to
    include this time here. But, who care?
  - **3.5h** to implement all final projects.

This and other courses need a backend require more setup. So I build
[a small Express app to serve all of them on Heroku](https://fcc-box.herokuapp.com/).

In order to do that, I had to modify some files that're suppose to not modified,
remove the `app = express()` and expose `express.Router()`. See the main app
code and some custom middlewares in
[heroku folder](https://github.com/letientai299/freecodecamp/tree/master/heroku)

The setup works quite well for passing the courses quickly, but I'm not happy
with its performance. I've tried [stress test](./heroku) the dummy `GET /`,
implement buffered logging and use `cluster` to run it with multi cores. If you
know any good resources or see any of my mistakes, I'm eager to learn.

| Task                                                | Note                                                   | Site                                                     |
| --------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| [Timestamp Microservice][fcc_ms_time]               | [./microservices/timestamp](./microservices/timestamp) | [timestamp](https://fcc-box.herokuapp.com/ms/timestamp/) |
| [Request Header Parser Microservice][fcc_ms_header] | [./microservices/who](./microservices/who)             | [who](https://fcc-box.herokuapp.com/ms/who/)             |
| [URL Shortener Microservice][fcc_ms_short_url]      | [./microservices/short](./microservices/short)         | [short](https://fcc-box.herokuapp.com/ms/short/)         |
| [Exercise Tracker][fcc_ms_exercise]                 | [./microservices/tracker](./microservices/tracker)     | [tracker](https://fcc-box.herokuapp.com/ms/tracker/)     |
| [File Metadata Microservice][fcc_ms_file]           | [./microservices/file](./microservices/file)           | [file](https://fcc-box.herokuapp.com/ms/file/)           |

### Quality assurange

- [Course link][fcc_qa]
- [Cert](https://www.freecodecamp.org/certification/letientai299/quality-assurance-v7)
- Time:
  - 2.5h for the course, learn about using
    [Passport.js](http://www.passportjs.org/), seem like a good framework to use
    if I would build backend with NodeJS.
  - 10h for final projects. I focused only on the API, ignored the UI. So please
    don't expect the UI to be usable.

For this course, honestly I'm not interested in the final projects. I like unit
test, but I really hate this combination:

- Unclear spec that force us to guess what the author means.
- Hidden tests that make it extremely frustrated to pass them. Yes, I could find
  the source for the tests, but that doesn't change my feeling about hidden
  tests.

As a result of such bad feelings, I have to do my best to get rid of those
projects as quicly as possible, including writing dummy tests in some of below
projects to pass the FCC tests. Sorry.

| Task                                             | Note                               | Site                                                      |
| ------------------------------------------------ | ---------------------------------- | --------------------------------------------------------- |
| [Metric-Imperial Converter][fcc_qa_converter]    | [./qa/converter](./qa/converter)   | [converter](https://fcc-box.herokuapp.com/qa/converter/)  |
| [Issue Tracker][fcc_qa_tracker]                  | [./qa/tracker](./qa/tracker)       | [tracker](https://fcc-box.herokuapp.com/qa/tracker)       |
| [Personal Library][fcc_qa_lib]                   | [./qa/lib](./qa/lib)               | [lib](https://fcc-box.herokuapp.com/qa/lib)               |
| [Sudoku Solver][fcc_qa_sudoku]                   | [./qa/sudoku](./qa/sudoku)         | [sudoku](https://fcc-box.herokuapp.com/qa/sudoku)         |
| [American British Translator][fcc_qa_translator] | [./qa/translator](./qa/translator) | [translator](https://fcc-box.herokuapp.com/qa/translator) |

### Information Security

- [Course link][fcc_sec]
- Cert: TODO
- Time:
  - 40m for both helmet and python part. For python part, I just guess, didn't
    watch the videos.

| Task                                              | Note                                                 | Site                                                                    |
| ------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------- |
| [Stock Price Checker][fcc_sec_stonk]              | [./infosec/stonk](./infosec/stonk)                   | [stonk](https://fcc-box.herokuapp.com/infosec/stonk/)                   |
| [Anonymous Message Board][fcc_sec_msg]            | [./infosec/bulletin-board](./infosec/bulletin-board) | [bulletin-board](https://fcc-box.herokuapp.com/infosec/bulletin-board/) |
| [Port Scanner][fcc_sec_port]                      | [./infosec/portscan](./infosec/portscan)             | [Code on Github][fcc_infosec_portscan_solution]                         |
| [SHA-1 Password Cracker][fcc_sec_sha]             | [./infosec/pwcracker](./infosec/pwcracker)           | [Code on Github][fcc_infosec_pw_solution]                               |
| [Secure Real Time Multiplayer Game][fcc_sec_game] | []()                                                 | []()                                                                    |

### Coding Interview Prep

- [Course link](https://www.freecodecamp.org/learn/coding-interview-prep/)

This doesn't have a cert. Not sure if I would done it all or not.

### Machine Learning with Python

- [Course link](https://www.freecodecamp.org/learn/machine-learning-with-python/)
- [Cert](https://www.freecodecamp.org/certification/letientai299/machine-learning-with-python-v7)
- Time:
  - 10m for guessing on multi choice questions
  - 22h for final projects.

See [its note here](./ai)

| Task                                                           | Site                                             |
| -------------------------------------------------------------- | ------------------------------------------------ |
| [Rock Paper Scissors][fcc_ai_rps]                              | [./ai/rps](./ai/rps)                             |
| [Cat and Dog Image Classifier][fcc_ai_cv]                      | [./ai/cv](./ai/cv)                               |
| [Book Recommendation Engine using K][fcc_ai_recommendation]    | [./ai/recommendation](./ai/recommendation)       |
| [Linear Regression Health Costs Calculator][fcc_ai_regression] | [./ai/linear_regression](./ai/linear_regression) |
| [Neural Network SMS Text Classifier][fcc_ai_nn]                | [./ai/nn](./ai/nn)                               |

### Front End Development Libraries

- [Course link](https://www.freecodecamp.org/learn/front-end-libraries/)

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
[fcc_pyda_mean]:
  https://www.freecodecamp.org/learn/data-analysis-with-python/data-analysis-with-python-projects/mean-variance-standard-deviation-calculator
[fcc_pyda_demographic]:
  https://www.freecodecamp.org/learn/data-analysis-with-python/data-analysis-with-python-projects/demographic-data-analyzer
[fcc_pyda_plot]:
  https://www.freecodecamp.org/learn/data-analysis-with-python/data-analysis-with-python-projects/medical-data-visualizer
[fcc_pyda_time]:
  https://www.freecodecamp.org/learn/data-analysis-with-python/data-analysis-with-python-projects/page-view-time-series-visualizer
[fcc_pyda_sea]:
  https://www.freecodecamp.org/learn/data-analysis-with-python/data-analysis-with-python-projects/sea-level-predictor
[fcc_ai_rps]:
  https://www.freecodecamp.org/learn/machine-learning-with-python/machine-learning-with-python-projects/rock-paper-scissors
[fcc_ai_cv]:
  https://www.freecodecamp.org/learn/machine-learning-with-python/machine-learning-with-python-projects/cat-and-dog-image-classifier
[fcc_ai_recommendation]:
  https://www.freecodecamp.org/learn/machine-learning-with-python/machine-learning-with-python-projects/book-recommendation-engine-using-knn
[fcc_ai_regression]:
  https://www.freecodecamp.org/learn/machine-learning-with-python/machine-learning-with-python-projects/linear-regression-health-costs-calculator
[fcc_ai_nn]:
  https://www.freecodecamp.org/learn/machine-learning-with-python/machine-learning-with-python-projects/neural-network-sms-text-classifier
[fcc_ms_time]:
  https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice
[fcc_ms_header]:
  https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/request-header-parser-microservice
[fcc_ms_short_url]:
  https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice
[fcc_ms_exercise]:
  https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker
[fcc_ms_file]:
  https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/file-metadata-microservice
[fcc_sec]: https://www.freecodecamp.org/learn/information-security
[fcc_sec_stonk]:
  https://www.freecodecamp.org/learn/information-security/information-security-projects/stock-price-checker
[fcc_sec_msg]:
  https://www.freecodecamp.org/learn/information-security/information-security-projects/anonymous-message-board
[fcc_sec_port]:
  https://www.freecodecamp.org/learn/information-security/information-security-projects/port-scanner
[fcc_sec_sha]:
  https://www.freecodecamp.org/learn/information-security/information-security-projects/sha-1-password-cracker
[fcc_sec_game]:
  https://www.freecodecamp.org/learn/information-security/information-security-projects/secure-real-time-multiplayer-game
[fcc_infosec_portscan_solution]:
  https://github.com/letientai299/freecodecamp/blob/master/infosec/portscan/port_scanner.py
[fcc_infosec_pw_solution]:
  https://github.com/letientai299/freecodecamp/blob/master/infosec/pwcracker/password_cracker.py
