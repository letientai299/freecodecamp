const urlFCC = "https://www.freecodecamp.org";
const urlPrefix = `${urlFCC}/page-data`;
const urlStart = `${urlPrefix}/learn/coding-interview-prep/page-data.json`;

const help = `
Prepare data from FCC course Coding Interview Prep
Data will be crawled starting from this URL:
${urlStart}

Options:
    -h  --help      Show this help message
(*) -o  --output    Output folder to write data (required)
    -f  --force     Force overwrite existing data (dangerous)!

If --force is provided, this script delete then recreate the output
folder before generate data.
`.trim();

const fs = require("fs");
const path = require("path");
const axios = require("axios");

const setupTurndown = () => {
  const TurndownService = require("turndown");
  const turndown = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
    preformattedCode: true,
    codeBlockStyle: "fenced",
  });
  const turndownPluginGfm = require("turndown-plugin-gfm");
  const gfm = turndownPluginGfm.gfm;
  const tables = turndownPluginGfm.tables;
  const strikethrough = turndownPluginGfm.strikethrough;
  turndown.use([
    gfm,
    tables,
    strikethrough,
    turndownPluginGfm.highlightedCodeBlock,
    turndownPluginGfm.taskListItems,
  ]);

  turndown.addRule("br", {
    filter: "br",
    replacement: () => "\n\n",
  });
  return turndown;
};

const turndown = setupTurndown();
const prettier = require("prettier");

class App {
  main(args) {
    const ops = new Option(args);
    if (ops.help) {
      console.log(help);
      return;
    }

    if (ops.force) {
      this.recreateDir(ops.out);
    }

    this.prepareData(ops);
  }

  recreateDir(out) {
    console.log(`>> Recreate ${out}`);
    fs.rmdirSync(out, { recursive: true });
    fs.mkdirSync(out);
  }

  prepareData(ops) {
    axios
      .get(urlStart)
      .then((res) =>
        this.processCourseData(ops, res.data.result.data.allChallengeNode.edges)
      )
      .catch((err) => console.error("fail to download data", err));
  }

  processCourseData(ops, challenges) {
    const modules = this.groupToModules(challenges, ops);
    Object.keys(modules).forEach((k) => {
      // create module folder
      if (fs.existsSync(k)) {
        fs.mkdirSync(k, { recursive: true });
      }

      modules[k].problems.forEach((p) => {
        this.prepareProblemData(p);
      });
    });
  }

  prepareProblemData(p) {
    // create problem folders
    if (!fs.existsSync(p.dir)) {
      fs.mkdirSync(p.dir, { recursive: true });
    }

    axios
      .get(p.urlJsonData)
      .then((res) => this.processProblemData(p, res.data.result.data))
      .catch((err) =>
        console.error(`fail to download problem problem`, p, err)
      );
  }

  groupToModules(challenges, ops) {
    return (
      challenges
        // ignore take home projects,
        // because we don't want to build that many website
        .filter((c) => !c.node.fields.slug.includes("take-home"))
        .map((c) => {
          const slug = c.node.fields.slug;
          const slugs = slug.split("/");
          let dir = slugs.slice(slugs.length - 2).join("/");
          dir = path.join(ops.out, dir);
          return {
            dir: dir,
            parentDir: path.join(
              ops.out,
              slugs.slice(slugs.length - 2, slugs.length - 1).join("/")
            ),
            urlJsonData: `${urlPrefix}${slug}/page-data.json`,
            url: `${urlFCC}${slug}`,
            title: c.title,
            moduleName: c.node.fields.blockName,
          };
        })
        .reduce((ms, c) => {
          const modulePath = c.parentDir;
          if (!ms[modulePath]) {
            ms[modulePath] = {
              problems: [],
              name: c.moduleName,
            };
          }

          ms[modulePath].problems.push(c);
          return ms;
        }, {})
    );
  }

  processProblemData(p, raw) {
    const problem = this.extractWantedChallengeData(p, raw);
    fs.writeFileSync(path.join(p.dir, "readme.md"), problem.mdDescription);

    // clear the Markdown content to save space on disk before writing json
    delete problem.mdDescription;

    fs.writeFileSync(
      path.join(p.dir, "fcc.json"),
      JSON.stringify(problem, null, 2)
    );

    const indexJSPath = path.join(p.dir, "index.js");
    if (!fs.existsSync(indexJSPath)) {
      fs.writeFileSync(indexJSPath, problem.boilerplate + "\n\n// TODO");
    }

    const indexTestJSPath = path.join(p.dir, "index.test.js");
    if (!fs.existsSync(indexTestJSPath)) {
      fs.writeFileSync(indexTestJSPath, "// TODO");
    }

    console.log(`Generated data in ${p.dir}`);
  }

  extractWantedChallengeData(p, raw) {
    const challenge = raw.challengeNode;
    const problem = {
      title: challenge.title,
      htmlDescription: challenge.description,
      boilerplate: challenge.files.indexjs.contents,
      url: p.url,
    };

    // not sure if there's any case like this, but I'll just leave it here
    if (problem.boilerplate === undefined) {
      problem.boilerplate = challenge.files.indexjsx.contents;
    }

    const md = this.html2Markdown(problem.htmlDescription);
    problem.mdDescription = `# ${problem.title}\n\n[FCC link](${p.url})\n\n${md}`;
    return problem;
  }

  html2Markdown(html) {
    let md = turndown.turndown(html);
    md = prettier.format(md, {
      printWidth: 80,
      proseWrap: "always",
      parser: "markdown",
    });
    return md;
  }
}

class Option {
  help = false;
  out = "";
  force = false;

  constructor(args) {
    this.help = args.includes("-h") || args.includes("--help");
    this.force = args.includes("-f") || args.includes("--force");

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg !== "-o" && arg !== "--out") {
        continue;
      }

      if (i === args.length - 1 || args[i + 1][0] === "-") {
        this.help = true;
      } else {
        this.out = path.join(process.cwd(), args[i + 1]);
      }
      break;
    }

    if (!this.out) {
      this.help = true;
    }
  }
}

const app = new App();
app.main(process.argv.slice(2));
