const fs = require("fs");
const path = require("path");

const hljs = require("highlight.js");
const marked = require("marked");
marked.setOptions({
  highlight: function (code, lang) {
    if (!lang || lang === "") {
      return code;
    }

    return hljs.highlight(code, { language: lang }).value;
  },
});

const SRC = path.join(__dirname, "../src");
const DIST = path.join(__dirname, "../dist");
const PUBLIC = path.join(__dirname, "../public");

/**
 * Prepare sidebar HTML contents
 */
function prepareSidebar(isTop = false) {
  const raw = fs.readFileSync(path.join(SRC, "index.json"));
  const modules = JSON.parse(raw);

  // create list of lists of solution links
  const lists = modulesToSidebarHTML(modules, isTop);

  // add the main pages to the list
  const headerHTMl = `
<ul>
${lists}
</ul>`.trim();

  // create the list of paths to generate next and previous for the headers.
  const paths = modulesToPaths(modules);
  return {
    html: headerHTMl,
    paths: paths,
  };
}

const renderProblemForSideBar = (problems, isTop = false) => {
  return problems
    .map((p) => {
      const slug = p.dir.replace("src/", isTop ? "./" : "./../../");
      return `<li><a href="${slug}">${p.title}</a></li>`.trim();
    })
    .join("\n");
};

function modulesToSidebarHTML(modules, isTop) {
  return Object.keys(modules)
    .map((k) => {
      const m = modules[k];
      return `
<li>
<p>${m.name}</p>
<ul>
${renderProblemForSideBar(m.problems, isTop)}
</ul>
</li>`.trim();
    })
    .join("\n");
}

function modulesToPaths(modules) {
  return Object.keys(modules)
    .flatMap((k) => {
      return modules[k].problems;
    })
    .map((c) => {
      c.path = c.dir.replace("src/", "./");
      return c;
    });
}

/**
 * Render the readme to the index page.
 */
function renderDoc(sidebar, header) {
  // hard code file path because we don't have any other readme to render
  const DOC_TEMPLATE = path.join(__dirname, "../templates/doc.tpl.html");
  const mdFile = path.join(__dirname, "../readme.md");
  const docTpl = fs.readFileSync(DOC_TEMPLATE).toString();
  const outFile = path.join(DIST, "index.html");
  const md = fs.readFileSync(mdFile).toString();

  let renderer = new marked.Renderer();
  renderer.link = docLinkRender;
  marked.setOptions({
    renderer: renderer,
  });

  const rendered = marked(md).toString();

  let html = docTpl
    .replace("{{sidebar}}", sidebar)
    .replace("{{readme}}", rendered)
    .replace("{{header}}", header)
    .replace("{{title}}", "FCC Coding Interview Prep Solutions")
    .replace(
      "{{description}}",
      "Main page for FCC Coding Interview Prep Solutions"
    );
  fs.writeFileSync(outFile, html);
}

function docLinkRender(href, title, text) {
  let link = marked.Renderer.prototype.link.call(this, href, title, text);
  if (href.includes("http")) {
    return link.replace("<a", "<a target='_blank' rel='noreferrer'");
  }

  return link;
}

if (!fs.existsSync(DIST)) {
  fs.mkdirSync(DIST);
}

// copy public files to dist
fs.readdirSync(PUBLIC).forEach((f) => {
  // minify it
  fs.copyFileSync(path.join(PUBLIC, f), path.join(DIST, f));
});

let sidebar = prepareSidebar(true);
const headerTpl = fs
  .readFileSync(path.join(__dirname, "../templates/_header.tpl.html"))
  .toString();

function renderHeader(back, next, github, isTop = false) {
  return headerTpl
    .replace("{{topURL}}", isTop ? "#" : "./../..")
    .replace("{{githubURL}}", github ? github : "#")
    .replace("{{backURL}}", back ? back : "#")
    .replace("{{backClass}}", back ? "" : "disabled-link")
    .replace("{{nextURL}}", next ? next : "#")
    .replace("{{nextClass}}", next ? "" : "disabled-link");
}

const codeTpl = fs
  .readFileSync(path.join(__dirname, "../templates/code.tpl.html"))
  .toString();

function renderCode(back, p, next) {
  const parents = "./../../";
  if (back && !parents.includes(back)) {
    back = parents + back;
  }

  if (next) {
    next = parents + next;
  }

  const header = renderHeader(
    back,
    next,
    "" // TODO: github
  );

  const fccRaw = fs.readFileSync(path.join(SRC, p.path, "fcc.json")).toString();
  const fccJSON = JSON.parse(fccRaw);
  let desc = `<h1>${p.title}</h1>` + fccJSON.htmlDescription;
  if (desc.includes(`class="language-`)) {
    const md = fs.readFileSync(path.join(SRC, p.path, "readme.md")).toString();
    desc = marked(md);
  }

  const html = codeTpl
    .replace("{{header}}", header)
    .replace("{{sidebar}}", sidebar.html)
    .replace("{{description}}", desc)
    .replace("{{code}}", fccJSON.boilerplate);

  const outDir = path.join(DIST, p.path);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outDir, "index.html"), html);
}

const docHeader = renderHeader(
  "", // there's no back link for home
  sidebar.paths[0].path,
  "", // TODO github link
  true
);
renderDoc(sidebar.html, docHeader);

// render the sidebar again for problem pages
sidebar = prepareSidebar(false);

// const paths = sidebar.paths.slice(0, 10);
const paths = sidebar.paths;
let back = "./../.."; // home location

for (let i = 0; i < paths.length; i++) {
  let p = paths[i];
  let next = paths[i + 1];
  renderCode(back, p, next ? next.path : "");
  back = p.path;
}
