const marked = require("marked");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "../src");
const DIST = path.join(__dirname, "../dist");
const PUBLIC = path.join(__dirname, "../public");

const renderProblems = (problems) => {
  return problems
    .map((p) => {
      return `<li>${p.title}</li>`.trim();
    })
    .join("\n");
};

/**
 * Prepare sidebar HTML contents
 */
const prepareSidebar = () => {
  const raw = fs.readFileSync(path.join(SRC, "index.json"));
  const modules = JSON.parse(raw);
  const lists = Object.keys(modules)
    .map((k) => {
      const m = modules[k];
      return `
<li>
<p>${m.name}</p>
<ul>
${renderProblems(m.problems)}
</ul>
</li>`.trim();
    })
    .join("\n");

  return `
<ul>
<li>Coding Interview Prep</li>
${lists}
</ul>`.trim();
};

/**
 * Render the readme to the index page.
 */
const renderDoc = function (sidebar) {
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
    .replace("{{header}}", "Header here")
    .replace("{{title}}", "FCC Coding Interview Prep Solutions")
    .replace(
      "{{description}}",
      "Main page for FCC Coding Interview Prep Solutions"
    );
  fs.writeFileSync(outFile, html);
};

const docLinkRender = function (href, title, text) {
  let link = marked.Renderer.prototype.link.call(this, href, title, text);
  if (href.includes("http")) {
    return link.replace("<a", "<a target='_blank' rel='noreferrer'");
  }

  return link;
};

if (!fs.existsSync(DIST)) {
  fs.mkdirSync(DIST);
}

fs.readdirSync(PUBLIC).forEach((f) => {
  fs.copyFileSync(path.join(PUBLIC, f), path.join(DIST, f));
});
const sidebar = prepareSidebar();
renderDoc(sidebar);
