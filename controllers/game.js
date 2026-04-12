const Game = require("../models/game");

module.exports = {
  cget: async (req, res) => {
    const games = await Game.findAll();
    res.json(games);
  },

  get: async (req, res) => {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.sendStatus(404);
    res.json(game);
  },

  post: async (req, res) => {
    const game = await Game.create(req.body);
    res.status(201).json(game);
  },

  patch: async (req, res) => {
    const [count, [updated]] = await Game.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (count === 0) return res.sendStatus(404);
    res.json(updated);
  },

  put: async (req, res) => {
    const existing = await Game.findByPk(req.params.id);
    const created = await Game.create({ id: req.params.id, ...req.body });
    if (existing) await existing.destroy();
    res.status(existing ? 200 : 201).json(created);
  },

  delete: async (req, res) => {
    const count = await Game.destroy({ where: { id: req.params.id } });
    if (count === 0) return res.sendStatus(404);
    res.sendStatus(204);
  },
};
