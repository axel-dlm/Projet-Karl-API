const { pickLanguage, translate } = require("../lib/translate");

module.exports = function i18nMiddleware(req, res, next) {
  const lang = pickLanguage(req);
  req.lang = lang;
  req.t = translate(lang);
  res.setHeader("Content-Language", lang);
  next();
};
