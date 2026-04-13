const Platform = require("../models/platform");

module.exports = {
  cget: async (req, res) => {
    const platforms = await Platform.findAll();
    res.json(platforms);
  },

  get: async (req, res) => {
    const platform = await Platform.findByPk(req.params.id);
    if (!platform) return res.sendStatus(404);
    res.json(platform);
  },

  post: async (req, res) => {
    const platform = await Platform.create(req.body);
    res.status(201).json(platform);
  },

  patch: async (req, res) => {
    const [count, [updated]] = await Platform.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (count === 0) return res.sendStatus(404);
    res.json(updated);
  },

  put: async (req, res) => {
    const existing = await Platform.findByPk(req.params.id);
    const created = await Platform.create({ id: req.params.id, ...req.body });
    if (existing) await existing.destroy();
    res.status(existing ? 200 : 201).json(created);
  },

  delete: async (req, res) => {
    const count = await Platform.destroy({ where: { id: req.params.id } });
    if (count === 0) return res.sendStatus(404);
    res.sendStatus(204);
  },
};
