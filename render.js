const marked = require("marked");
const fs = require("fs");
const glob = require("glob");

const TEMPLATE_FILE = "./index.tpl.html";
const tpl = fs.readFileSync(TEMPLATE_FILE)
  .toString();

glob("**/*.md", {}, function(err, files) {
  if (err) {
    console.log(err);
    return;
  }
  files.filter(f => !f.includes("node_modules"))
    .forEach(render);
});

const render = function(mdFile) {
  const out = mdFile.replace(/readme.md/i, "index.html");
  const md = fs.readFileSync(mdFile)
    .toString();

  let renderer = new marked.Renderer();
  renderer.link = linkRender;
  marked.setOptions({
    renderer: renderer
  });

  const rendered = marked(md)
    .toString();

  let html = tpl.replace("{{readme}}", rendered);
  fs.writeFileSync(out, html);
};

const linkRender = function(href, title, text) {
  let link = marked.Renderer.prototype.link.call(this, href, title, text);
  return link.replace("<a", "<a target='_blank' ");
};
