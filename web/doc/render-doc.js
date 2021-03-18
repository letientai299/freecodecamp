const marked = require("marked");
const fs = require("fs");

const TEMPLATE_FILE = "web/doc/tpl.html";
const tpl = fs.readFileSync(TEMPLATE_FILE).toString();

const render = function(mdFile) {
  const out = mdFile.replace(/readme.md/i, "index.html");
  const md = fs.readFileSync(mdFile).toString();

  let renderer = new marked.Renderer();
  renderer.link = linkRenderer;

  let toc = [];
  renderer.heading = headingRenderer(toc);
  marked.setOptions({
    renderer: renderer,
    gfm: true,
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
    .replace("{{subtitle}}", subtitle)
    .replace("{{toc}}", renderToc(toc));

  fs.writeFileSync(out, html);
};

// custom link render for additional goodies:
// - open link in new tab
const linkRenderer = function(href, title, text) {
  let link = marked.Renderer.prototype.link.call(this, href, title, text);
  return link.replace("<a", "<a target='_blank' ");
};

// custom heading renderer to collect all headers in the document,
// so that we can generate the TOC (table of content) later.
const headingRenderer = function(toc) {
  let hasOtherHeaderBefore = false;
  return function(text, level, raw) {
    let anchor = raw.replace(/\s+/g, "_").toLowerCase();
    toc.push({
      anchor: anchor,
      level: level,
      text: text
    });

    // save the for the toc
    if (level === 1) {
      return "";
    }

    // treat h2 specially, for the FCC exercise
    let s = `<section class="main-section header-${level}" id="${anchor}">
<header>${text}</header>\n`;
    if (!hasOtherHeaderBefore) {
      hasOtherHeaderBefore = true;
      return s;
    }

    return `</section>\n${s}`;
  };
};

const renderToc = function(toc) {
  let pre = `<nav id="navbar">\n`;
  let post = `\n</nav>`;
  let s = toc
    .map(h => {
      if (h.level === 1) {
        return `<header class="nav-level-1">${h.text}</header>`;
      }

      return `<a class="nav-link nav-level-${h.level}" href="#${h.anchor}">${h.text}</a>`;
    })
    .join("\n");
  return pre + s + post;
};

render("./web/doc/readme.md");
