# Coding Interview Prep

This contains the solutions for this [FCC course][fcc_interview] and code to
render them as a website.

<!-- toc -->

## User guide

If you're seeing this as a website, and interested in solution for a particular
problem, use the Search button in the top left corner.

If you're seeing this on Github, then take a look in [`./src`](./src) for all
the solutions (you'll have to help yourselves to find your interesting
problems). See also the [`./scripts`](./scripts) and `Makefile` for the code
that I used to render from `src` to [the website](TODO)

Read on my thought process when building this page.

## How this page was built?

I've tried to look into many Frontend frameworks like React, Vue, Angular and
some built up from them for something that satisfy follow needs:

- Generate from static contents (markdown, JS), output static HTML, CSS with
  minimal JS for little interaction.
- Offline support.
- Fast rendering, because I want to increase my Github Actions time for every
  push during solving problem for this FCC course.

In the end, I realize that I don't need a Frontend framework (yet). Heck, I
don't even need any template engine. I'll just hack my way to put my contents in
to predefined HTML, then throw in some CSS to make them look nice, and, write
some scripts to add Search, Keyboards shortcuts and Button works.

Below are the thought process and steps to build it. I use _we_, _our_, _us_
because I don't think I'm gonna solve all the problems, i.e. solution
contribution are welcome!

### Requirements and Design

#### Problem and solution pages

Our page should look like this

```
+----------+--------------------------+------------------------------+
|[Search]  | Problem description (2)  | Code (3)                     |
|Index (1) |                          |                              |
|* Cat a   |                          |                              |
|** Sub b  +--------------------------+ [Run][Reset][...]            |
|...       | Test case (4)            |------------------------------|
|          |                          | Console                      |
|          |                          |                              |
+----------+--------------------------+------------------------------+
```

- `Index` columns is our navigation bar. It should be searchable and available
  in all pages under the site path. Hence, we need a some processing step that
  turn our `src` to a tree. We also need to find a library to provide the
  filtering function.

- `Problem description` should come from FCC site. We probably need a script to
  crawl their site, convert all HTML to Markdown to display on Github, then
  render that Markdown back to HTML for our pages.

- `Code`: we should display the same boilerplate with FCC in a web editor
  library (probably [monaco][monaco] or [codemirror][codemirror]), so that users
  can have fun with the problem if they want. We should also support following
  features in our button menu:

  - `Run`: run the code, capture the `console.log` output and put them in
    `Console` cell.
  - `Reset`: clear the `Code`, put the boilerplate back, should ask for
    confirmation.
  - `Solution`: ask for confirmation, and if user really want, display the
    solution.
  - `Copy`: copy the code to clipboard, so that they can submit it to FCC site.

- `Test Case`: this should render the test code written by ourselves, which
  should be much more detailed than the FCC tests.

- All 5 cells should be independently scrollable.

- On mobile, `Index` should become a drawer that is toglable. Other 4 cells
  should become single column.

#### Document page

Just 2 columns, `Index` and the rendered content should work.

#### Non functional

- Browsers with JS disabled should see the HTML version contains solution and
  the code should be highglihted.

- Browsers with both JS and CSS disabled (`w3m`) should still see the solution
  code.

### Prepare data

Our contents, beside manually written Markdown, includes:

- Problem description and boilerplate code downloaed from FCC
- Solution and test code, written manually

The folder structured should look like:

```
src
├── algorithms
├── data-structures
├── project-erler
│   └── problem-1-multiples-of-3-and-5
└── rosetta-code
    └── 100-doors
        ├── fcc.json          # raw data crawled from FCC, for rendering
        ├── index.js          # solution
        ├── index.test.js     # out tests
        └── readme.md         # problem description, for Github reader
```

Fortunately, FCC has predictable API that provide everything we need, even the
test cases and expected answer (see [this json][fcc_interview_rosetta_24_game])
so our crawlwer is actually easy to implement. In fact, we could even generate
dummy solution that only returns what the tests expect, but we're good students,
so we won't do that.

See the crawler code in [./scripts./prepare-data.js](./scripts/prepare-data.js).

<!-- ref -->

[fcc_interview]: https://www.freecodecamp.org/learn/coding-interview-prep/
[monaco]: https://microsoft.github.io/monaco-editor/
[codemirror]: https://codemirror.net
[fcc_interview_rosetta_24_game]:
  https://www.freecodecamp.org/page-data/learn/coding-interview-prep/rosetta-code/24-game/page-data.json
