function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toXml(name, value) {
  if (value === null || value === undefined) {
    return "<" + name + "/>";
  }
  if (Array.isArray(value)) {
    const inner = value.map((v) => toXml("item", v)).join("");
    return "<" + name + ">" + inner + "</" + name + ">";
  }
  if (typeof value === "object") {
    const inner = Object.entries(value).map(([k, v]) => toXml(k, v)).join("");
    return "<" + name + ">" + inner + "</" + name + ">";
  }
  return "<" + name + ">" + escapeXml(value) + "</" + name + ">";
}

function plainify(data) {
  if (Array.isArray(data)) return data.map(plainify);
  if (data && typeof data.toJSON === "function") return data.toJSON();
  if (data && typeof data === "object") {
    const out = {};
    for (const key of Object.keys(data)) {
      out[key] = plainify(data[key]);
    }
    return out;
  }
  return data;
}

function detectFormat(req) {
  if (req.query.format) return String(req.query.format).toLowerCase();
  const accept = (req.headers.accept || "").toLowerCase();
  if (accept.includes("xml")) return "xml";
  return "json";
}

module.exports = function formatMiddleware(req, res, next) {
  res.render = function (data) {
    const format = detectFormat(req);
    const plain = plainify(data);

    if (format === "xml") {
      res.type("application/xml");
      const root = Array.isArray(plain) ? "items" : "item";
      const xml = '<?xml version="1.0" encoding="UTF-8"?>' + toXml(root, plain);
      return res.send(xml);
    }

    res.type("application/json");
    return res.json(plain);
  };

  next();
};
