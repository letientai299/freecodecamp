const editorElem = document.getElementById("editor");
let consoleOutput;
let consoleOutputWrapper;

const body = document.getElementsByTagName("body")[0];
const autoSaveIntervalMs = 1000;
let cm;

function autoSaveEditorValue() {
  if (cm.isClean()) {
    return;
  }

  const href = window.location.pathname;
  window.localStorage.setItem(href, cm.getValue());
  cm.markClean();
  setInterval(autoSaveEditorValue, autoSaveIntervalMs);
}

function setupEditor() {
  cm = CodeMirror.fromTextArea(editorElem, {
    lineNumbers: true,
    theme: "monokai",
    mode: "javascript",
    viewportMargin: Infinity,
    keyMap: "vim",
    tabSize: 2,
    extraKeys: createEditorExtraKeys(getModKey()),
    autofocus: false,
    screenReaderLabel: "code editor",
  });

  reloadSavedCode();
  cm.setSize("100%", "100%");
  cm.refresh();

  window.addEventListener("resize", () => {
    cm.setSize("100%", "100%");
    cm.refresh();
  });

  window.addEventListener("focus", () => {
    reloadSavedCode();
  });

  setInterval(autoSaveEditorValue, autoSaveIntervalMs);
}

function reloadSavedCode() {
  const href = window.location.pathname;
  const saved = window.localStorage.getItem(href);
  if (saved) {
    cm.setValue(saved);
  }
}

function setShortcutDialogVisible(e, visible) {
  if (e) e.preventDefault();
  const s = visible ? "visible" : "hidden";
  document.getElementById("shortcut-dialog").style = `visibility:${s};`;
}

function registerCodeShortcuts() {
  registerDocShortcuts();
  const modKey = getModKey();
  // TODO: test with linux
  hotkeys(`${modKey}+Enter`, runCode);
  hotkeys(`${modKey}+Shift+l`, clearConsole);
  hotkeys(`${modKey}+Shift+k`, resetEditor);
  hotkeys(`${modKey}+Shift+x`, showSolution);
  hotkeys("g", (e) => {
    e.preventDefault();
    setShortcutDialogVisible(null, false);
    cm.getInputField().focus();
  });
}

function createEditorExtraKeys(modKey) {
  const extra = {};
  extra[`${modKey}-Enter`] = runCode;
  extra[`Shift-${modKey}-L`] = clearConsole;
  extra[`Shift-${modKey}-K`] = resetEditor;
  extra[`Shift-${modKey}-X`] = showSolution;
  extra[`Shift-Esc`] = () => {
    cm.getInputField().blur();
    body.focus();
  };
  return extra;
}

function registerDocShortcuts() {
  hotkeys("shift+/", (e) => setShortcutDialogVisible(e, true));
  hotkeys("esc", (e) => setShortcutDialogVisible(e, false));
  hotkeys("shift+t", (e) => {
    e.preventDefault();
    window.location = document.getElementById("top-link").getAttribute("href");
  });

  hotkeys("[", (e) => {
    e.preventDefault();
    window.location = document.getElementById("back-link").getAttribute("href");
  });

  hotkeys("]", (e) => {
    e.preventDefault();
    window.location = document.getElementById("next-link").getAttribute("href");
  });
}

function getModKey() {
  return window.navigator.userAgent.indexOf("Mac") !== -1 ? "Cmd" : "Ctrl";
}

function runCode() {
  const code = cm.getValue();
  // FIXME: security issues
  setTimeout(code, 0);
}

function showSolution() {
  console.log("ask and then show solution");
}

function clearConsole() {
  consoleOutput.innerText = "";
}

function resetEditor() {
  if (cm) {
    cm.setValue(editorElem.innerHTML);
  }
}

function setupConsoleOutput() {
  consoleOutput = document.getElementById("console");
  consoleOutputWrapper = document.getElementById("console-wrapper");
  clearConsole();
}

function setupEditorButtons() {
  document.getElementById("code-clear-console").onclick = clearConsole;
  document.getElementById("code-run").onclick = runCode;
  document.getElementById("code-show-solution").onclick = showSolution;
  document.getElementById("code-run").onclick = runCode;
  document.getElementById("code-reset").onclick = resetEditor;
  document.getElementById("code-copy").onclick = () =>
    copyToClipboard(cm.getValue());
}

function renderMath() {
  let es = document.getElementsByClassName("markdown-body");
  for (let e of es) {
    renderMathInElement(e, {
      // customised options
      // • auto-render specific keys, e.g.:
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true },
      ],
      // • rendering keys, e.g.:
      throwOnError: false,
    });
  }
}

if (editorElem) {
  setupEditor();
  registerCodeShortcuts();
  hijackConsole();
  setupConsoleOutput();
  setupEditorButtons();
  window.onload = function () {
    renderMath();
  };
} else {
  registerDocShortcuts();
}

function hijackConsole() {
  const stdLog = console.log;
  console.log = (...args) => fakeLog(stdLog, args);
}

function fakeLog(std, args) {
  const msg = [];
  std.apply(console, args);
  msg.push.apply(
    msg,
    args.map((a) => {
      if (typeof a === "object") return JSON.stringify(a);
      return a;
    })
  );
  consoleOutput.innerText += msg.join(" ") + "\n";
  consoleOutputWrapper.scrollTop = consoleOutputWrapper.scrollHeight;
}

// Copies a string to the clipboard. Must be called from within an
// event handler such as click. May return false if it failed, but
// this is not always possible. Browser support for Chrome 43+,
// Firefox 42+, Safari 10+, Edge and Internet Explorer 10+.
// Internet Explorer: The clipboard feature may be disabled by
// an administrator. By default a prompt is shown the first
// time the clipboard is used (per session).
//
// Copied and modified from https://stackoverflow.com/a/33928558/3869533

function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown
    // while dialog is visible.
    return window.clipboardData.setData("Text", text);
  } else if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    // Prevent scrolling to bottom of page in Microsoft Edge.
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      // Security exception may be thrown by some browsers.
      if (document.execCommand("copy")) {
        console.log("Code is copied to clipboard");
      }
      return;
    } catch (ex) {
      console.log("Copy to clipboard failed.", ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

function makeSidebarInteractive() {
  const modules = document.getElementsByClassName("module-name");

  for (let m of modules) {
    m.addEventListener("click", () => toggleModule(m));
  }

  // scroll to current problem
  let currentProblem = document.getElementsByClassName("current-problem")[0];
  if (currentProblem) {
    currentProblem.scrollIntoView({ behavior: "smooth" });
  }

  const searchTargets = document.querySelectorAll("aside p, aside a");
  searchTargets.forEach((t) => {
    let clickable = t;
    if (t.tagName.toLowerCase() === "a") {
      clickable = t.closest("li");
    }

    clickable.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        t.click();
        console.log("clicked");
      }
    });

    t.preparedText = fuzzysort.prepare(t.innerText.toLowerCase());
  });

  const targets = [...searchTargets];

  const inputBox = document.getElementById("problem-search-input");
  inputBox.addEventListener("change", () =>
    handleSearchInputChange(inputBox, targets)
  );
  inputBox.addEventListener(
    "input",
    throttle(() => handleSearchInputChange(inputBox, targets), 1000)
  );
  handleSearchInputChange(inputBox, targets);
}

window.addEventListener("load", () => makeSidebarInteractive());

function toggleModule(m) {
  let cls = m.className;
  if (cls.includes("module-open")) {
    cls = cls.replace("open", "close");
  } else {
    cls = cls.replace("close", "open");
  }
  m.className = cls;
}

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
  let context, args, result;
  let timeout = null;
  let previous = 0;
  if (!options) options = {};
  let later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    let now = Date.now();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

function hideSidebarItem(e) {
  e.setAttribute("style", "display:none");
  if (e.tagName.toLowerCase() === "a") {
    e = e.closest("li");
  }
  e.setAttribute("tabindex", "-1");
}

function showSidebarItem(e) {
  e.setAttribute("style", "display:inherit");
  if (e.tagName.toLowerCase() !== "a") {
    e.setattribute("tabindex", "0");
  }

  let li = e.closest("li");
  li.setAttribute("tabindex", "0");
  const m = li
    .closest("ul")
    .closest("li")
    .getElementsByClassName("module-name")[0];
  m.setAttribute("style", "display:inherit");
}

function handleSearchInputChange(input, targets) {
  const s = input.value.toLowerCase().trim();

  if (!s) {
    [...document.getElementsByClassName("module-name")].forEach((e) => {
      let cls = e.className;
      e.className = cls.replace("module-in-searching", "");
    });

    targets.forEach((e) => {
      e.setAttribute("style", "display:block");
      e.setAttribute("tabindex", "0");
    });
    return;
  }

  [...document.getElementsByClassName("module-name")].forEach((e) => {
    let cls = e.className.split(" ");
    if (!cls.includes("module-in-searching")) {
      cls.push("module-in-searching");
      e.className = cls.join(" ");
    }
  });

  let res = new Set(
    fuzzysort
      .go(s, targets, {
        key: "preparedText",
        allowTypo: false,
      })
      .map((r) => r.obj)
  );

  targets.forEach((e) => {
    if (res.has(e)) {
      showSidebarItem(e);
    } else {
      hideSidebarItem(e);
    }
  });
}
