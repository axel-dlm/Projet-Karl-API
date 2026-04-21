const { Studio, Game } = require("../models/associations");

module.exports = {
  cget: async (req, res) => {
    const studios = await Studio.findAll();
    res.setHateoas({
      self: "/studios",
      create: { method: "POST", href: "/studios" },
    });
    res.render(studios);
  },

  get: async (req, res) => {
    const studio = await Studio.findByPk(req.params.id, {
      include: [{ model: Game, as: "games" }],
    });
    if (!studio) {
      return res.status(404).json({ error: req.t("messages.not_found") });
    }
    res.setHateoas({
      self: "/studios/" + studio.id,
      list: "/studios",
      games: "/games?studioId=" + studio.id,
      update: { method: "PATCH", href: "/studios/" + studio.id },
      delete: { method: "DELETE", href: "/studios/" + studio.id },
    });
    res.render(studio);
  },

  post: async (req, res) => {
    const studio = await Studio.create(req.body);
    res.status(201).render(studio);
  },

  patch: async (req, res) => {
    const [count, [updated]] = await Studio.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (count === 0) {
      return res.status(404).json({ error: req.t("messages.not_found") });
    }
    res.render(updated);
  },

  put: async (req, res) => {
    const existing = await Studio.findByPk(req.params.id);
    const created = await Studio.create({ id: req.params.id, ...req.body });
    if (existing) await existing.destroy();
    res.status(existing ? 200 : 201).render(created);
  },

  delete: async (req, res) => {
    const count = await Studio.destroy({ where: { id: req.params.id } });
    if (count === 0) {
      return res.status(404).json({ error: req.t("messages.not_found") });
    }
    res.sendStatus(204);
  },
};
