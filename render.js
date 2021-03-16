const marked = require("marked");
const fs = require("fs");

const TEMPLATE_FILE = "./index.tpl.html";
const README = "./readme.md";
const OUT = "./index.html";

const tpl = fs.readFileSync(TEMPLATE_FILE).toString();
const md = fs.readFileSync(README).toString();

let renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  var link = marked.Renderer.prototype.link.call(this, href, title, text);
  return link.replace("<a", "<a target='_blank' ");
};
marked.setOptions({
  renderer: renderer
});

const rendered = marked(md).toString();

let html = tpl.replace("{{readme}}", rendered);
fs.writeFileSync(OUT, html);
