const marked = require("marked");
const fs = require("fs");
const glob = require("glob");

const TEMPLATE_FILE = "./tpl.html";
const tpl = fs.readFileSync(TEMPLATE_FILE).toString();

glob("**/*.md", {}, function(err, files) {
  if (err) {
    console.log(err);
    return;
  }
  files
    .filter(f => !f.includes("node_modules"))
    .filter(f => !f.includes("web/doc"))
    .filter(f => !f.includes("pyda"))
    .filter(f => !f.includes("interview"))
    .forEach(render);
});

const render = function(mdFile) {
  const out = mdFile.replace(/readme.md/i, "index.html");
  const md = fs.readFileSync(mdFile).toString();

  let renderer = new marked.Renderer();
  renderer.link = linkRender;
  marked.setOptions({
    renderer: renderer
  });

  const rendered = marked(md).toString();

  let subtitle = mdFile
    .replace(/readme.md/i, "")
    .replace(/\.\//, "")
    .toUpperCase();

  if (subtitle.includes("/")) {
    subtitle = `${subtitle.replace("/", "")} | `;
  }

  let html = tpl
    .replace("{{readme}}", rendered)
    .replace("{{subtitle}}", subtitle);
  fs.writeFileSync(out, html);
};

const linkRender = function(href, title, text) {
  let link = marked.Renderer.prototype.link.call(this, href, title, text);
  if (href.includes("http")) {
    return link.replace("<a", "<a target='_blank' rel='noreferrer'");
  }

  if (href.includes(".ipynb")) {
    return link.replace(".ipynb", ".html");
  }

  return link;
};
