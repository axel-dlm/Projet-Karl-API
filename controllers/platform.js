const { Platform, Game } = require("../models/associations");

module.exports = {
  cget: async (req, res) => {
    const platforms = await Platform.findAll();
    res.setHateoas({
      self: "/platforms",
      create: { method: "POST", href: "/platforms" },
    });
    res.render(platforms);
  },

  get: async (req, res) => {
    const platform = await Platform.findByPk(req.params.id, {
      include: [{ model: Game, as: "games", through: { attributes: [] } }],
    });
    if (!platform) {
      return res.status(404).json({ error: req.t("messages.not_found") });
    }
    res.setHateoas({
      self: "/platforms/" + platform.id,
      list: "/platforms",
      update: { method: "PATCH", href: "/platforms/" + platform.id },
      delete: { method: "DELETE", href: "/platforms/" + platform.id },
    });
    res.render(platform);
  },

  post: async (req, res) => {
    const platform = await Platform.create(req.body);
    res.status(201).render(platform);
  },

  patch: async (req, res) => {
    const [count, [updated]] = await Platform.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (count === 0) {
      return res.status(404).json({ error: req.t("messages.not_found") });
    }
    res.render(updated);
  },

  put: async (req, res) => {
    const existing = await Platform.findByPk(req.params.id);
    const created = await Platform.create({ id: req.params.id, ...req.body });
    if (existing) await existing.destroy();
    res.status(existing ? 200 : 201).render(created);
  },

  delete: async (req, res) => {
    const count = await Platform.destroy({ where: { id: req.params.id } });
    if (count === 0) {
      return res.status(404).json({ error: req.t("messages.not_found") });
    }
    res.sendStatus(204);
  },
};
