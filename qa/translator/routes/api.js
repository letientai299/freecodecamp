"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const locale = req.body.locale;
    const text = req.body.text;

    if (text === undefined || !locale) {
      return res.json(err("Required field(s) missing"));
    }

    if (text === "") {
      return res.json(err("No text to translate"));
    }

    if (!validLocale(locale)) {
      return res.json(err("Invalid value for locale field"));
    }

    const result = translator.trans(locale, text);
    return res.json(result);
  });
};

const err = (s) => ({ error: s });

const validLocale = (locale) =>
  locale === "american-to-british" || locale === "british-to-american";
