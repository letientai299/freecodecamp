const usOnly = require("./american-only.js");
const gbOnly = require("./british-only.js");
const us2gbSpelling = require("./american-to-british-spelling.js");
const gb2usSpelling = reverse(us2gbSpelling);
const us2gbTitles = require("./american-to-british-titles.js");
const gb2usTitles = reverse(us2gbTitles);

const us2gb = Object.assign({}, usOnly, us2gbSpelling, us2gbTitles);
const gb2us = Object.assign({}, gbOnly, gb2usSpelling, gb2usTitles);

const timeRegexGB = /^[0-9]{2}\.[0-9]{2}$/;
const timeRegexUS = /^[0-9]{2}:[0-9]{2}$/;

class Translator {
  trans(locale, s) {
    let dict, timeRegex, timeConv;
    if (locale === "american-to-british") {
      dict = us2gb;
      timeRegex = timeRegexUS;
      timeConv = (w) => w.replace(":", ".");
    } else {
      dict = gb2us;
      timeRegex = timeRegexGB;
      timeConv = (w) => w.replace(".", ":");
    }

    const tokens = s.split(/\s+/);

    let needTranslate = false;
    const theirs = tokens.map((original) => {
      let our = original.toLowerCase();
      if (our.match(timeRegex)) {
        needTranslate = true;
        return this.fmt(our, timeConv(our));
      }

      let their = dict[our];
      if (their) {
        needTranslate = true;
        return this.fmt(original, their);
      }

      return original;
    });

    if (!needTranslate) {
      return {
        text: s,
        translation: "Everything looks good to me!",
      };
    }

    return {
      text: s,
      translation: theirs.join(" ").trim(),
    };
  }

  fmt(origin, their) {
    let first = origin[0].toUpperCase();
    if (first === origin[0]) {
      their = their[0].toUpperCase() + their.slice(1);
    }

    return `<span class="highlight">${their}</span>`;
  }
}

function reverse(dict) {
  const r = {};
  Object.keys(dict).forEach((k) => (r[dict[k]] = k));
  return r;
}

module.exports = Translator;
