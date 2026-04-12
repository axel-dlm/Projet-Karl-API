const Studio = require("../models/studio");

module.exports = {
  cget: async (req, res) => {
    const studios = await Studio.findAll();
    res.json(studios);
  },

  get: async (req, res) => {
    const studio = await Studio.findByPk(req.params.id);
    if (!studio) return res.sendStatus(404);
    res.json(studio);
  },

  post: async (req, res) => {
    const studio = await Studio.create(req.body);
    res.status(201).json(studio);
  },

  patch: async (req, res) => {
    const [count, [updated]] = await Studio.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (count === 0) return res.sendStatus(404);
    res.json(updated);
  },

  put: async (req, res) => {
    const existing = await Studio.findByPk(req.params.id);
    const created = await Studio.create({ id: req.params.id, ...req.body });
    if (existing) await existing.destroy();
    res.status(existing ? 200 : 201).json(created);
  },

  delete: async (req, res) => {
    const count = await Studio.destroy({ where: { id: req.params.id } });
    if (count === 0) return res.sendStatus(404);
    res.sendStatus(204);
  },
};
