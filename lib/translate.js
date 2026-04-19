const en = require("../locales/en.json");
const fr = require("../locales/fr.json");

const dictionaries = { en, fr };

function pickLanguage(req) {
  const header = req.headers["accept-language"];
  if (!header) return "en";

  const first = header.split(",")[0].split(";")[0].trim().substring(0, 2).toLowerCase();
  if (dictionaries[first]) return first;
  return "en";
}

function translate(language) {
  const dict = dictionaries[language] || dictionaries.en;
  return function t(key) {
    const value = key.split(".").reduce((obj, k) => (obj ? obj[k] : null), dict);
    return value || key;
  };
}

module.exports = { pickLanguage, translate };
