const createApp = Vue.createApp;

const App = {
  data() {
    return { text: "" };
  },

  methods: {
    renderMD() {
      return marked.parse(this.text);
    },
  },

  mounted() {
    this.text = document.getElementById("example").value;
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
      langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
      pedantic: false,
      gfm: true,
      breaks: true,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });

    // hack to make FCC test work!
    const editor = document.getElementById("editor");
    const preview = document.getElementById("preview");
    const dispatch = editor.dispatchEvent;
    editor.dispatchEvent = (ev) => {
      if (ev.type == "keyup") {
        ev.preventDefault();
        this.text = editor.value;
        preview.innerHTML = this.renderMD();
        return;
      }

      dispatch(ev);
    };
  },
};
createApp(App).mount("#app");
