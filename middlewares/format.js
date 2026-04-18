const Papa = require("papaparse");

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
  if (accept.includes("csv")) return "csv";
  return "json";
}

module.exports = function formatMiddleware(req, res, next) {
  res.locals.hateoas = null;

  res.setHateoas = function (links) {
    res.locals.hateoas = links;
  };

  res.render = function (data) {
    const format = detectFormat(req);
    const plain = plainify(data);
    const links = res.locals.hateoas;

    if (format === "csv") {
      res.type("text/csv");
      const arr = Array.isArray(plain) ? plain : [plain];
      return res.send(Papa.unparse(arr));
    }

    let payload = plain;
    if (links && Object.keys(links).length > 0) {
      if (Array.isArray(plain)) {
        payload = { items: plain, _links: links };
      } else {
        payload = Object.assign({}, plain, { _links: links });
      }
    }

    if (format === "xml") {
      res.type("application/xml");
      const root = Array.isArray(plain) ? "items" : "item";
      const xml = '<?xml version="1.0" encoding="UTF-8"?>' + toXml(root, payload);
      return res.send(xml);
    }

    res.type("application/json");
    return res.json(payload);
  };

  next();
};
