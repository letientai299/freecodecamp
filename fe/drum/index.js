import "https://cdn.jsdelivr.net/npm/svelte@3.48.0/internal/index.js";

const compile = svelte.compile;

// poor man svelte REPL that support only 1 elemnet
fetch("./App.svelte")
  .then((res) => res.text())
  .then((data) => {
    let s = compile(data);
    let code = s.js.code;
    code =
      code
        .replace("import", "let")
        .replace(`from "svelte/internal";`, " = exports;") +
      `
       new Component({
        target: document.getElementById("app"),
       });
       `;

    const el = document.createElement("script");
    el.setAttribute("type", "module");
    el.innerHTML = code;
    document.body.appendChild(el);
  });
