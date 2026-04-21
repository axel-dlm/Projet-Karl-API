const Game = require("../models/game");

function buildItemLinks(game) {
  return {
    self: "/games/" + game.id,
    list: "/games",
    update: { method: "PATCH", href: "/games/" + game.id },
    delete: { method: "DELETE", href: "/games/" + game.id },
  };
}

module.exports = {
  cget: async (req, res) => {
    const games = await Game.findAll();
    res.setHateoas({
      self: "/games",
      create: { method: "POST", href: "/games" },
    });
    res.render(games);
  },

  get: async (req, res) => {
    const game = await Game.findByPk(req.params.id);
    if (!game) {
      return res.status(404).json({ error: req.t("messages.not_found") });
    }
    res.setHateoas(buildItemLinks(game));
    res.render(game);
  },

  post: async (req, res) => {
    const game = await Game.create(req.body);
    res.setHateoas(buildItemLinks(game));
    res.status(201).render(game);
  },

  patch: async (req, res) => {
    const [count, [updated]] = await Game.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (count === 0) {
      return res.status(404).json({ error: req.t("messages.not_found") });
    }
    res.setHateoas(buildItemLinks(updated));
    res.render(updated);
  },

  put: async (req, res) => {
    const existing = await Game.findByPk(req.params.id);
    const created = await Game.create({ id: req.params.id, ...req.body });
    if (existing) await existing.destroy();
    res.setHateoas(buildItemLinks(created));
    res.status(existing ? 200 : 201).render(created);
  },

  delete: async (req, res) => {
    const count = await Game.destroy({ where: { id: req.params.id } });
    if (count === 0) {
      return res.status(404).json({ error: req.t("messages.not_found") });
    }
    res.sendStatus(204);
  },
};
