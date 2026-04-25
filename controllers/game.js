const { Game, Studio, Platform } = require("../models/associations");

function buildItemLinks(game) {
  return {
    self: "/games/" + game.id,
    list: "/games",
    update: { method: "PATCH", href: "/games/" + game.id },
    delete: { method: "DELETE", href: "/games/" + game.id },
  };
}

module.exports = {
  cgetV1: async (req, res) => {
    const games = await Game.findAll();
    res.setHateoas({
      self: "/games",
      create: { method: "POST", href: "/games" },
    });
    res.render(games);
  },

  cgetV2: async (req, res) => {
    let { page, itemsPerPage, ...filters } = req.query;
    page = page ? parseInt(page, 10) : 1;
    itemsPerPage = itemsPerPage ? parseInt(itemsPerPage, 10) : 10;

    delete filters.format;

    const { count, rows } = await Game.findAndCountAll({
      where: filters,
      offset: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
      include: [
        { model: Studio, as: "studio" },
        { model: Platform, as: "platforms", through: { attributes: [] } },
      ],
    });

    const enriched = rows.map((game) => {
      const obj = game.toJSON();
      obj.genreLabel = req.t("genre." + obj.genre);
      return obj;
    });

    const lastPage = Math.max(1, Math.ceil(count / itemsPerPage));
    const links = {
      self: "/games?page=" + page,
      first: "/games?page=1",
      last: "/games?page=" + lastPage,
      create: { method: "POST", href: "/games" },
    };
    if (page > 1) links.prev = "/games?page=" + (page - 1);
    if (page < lastPage) links.next = "/games?page=" + (page + 1);

    res.setHateoas(links);
    res.render(enriched);
  },

  get: async (req, res) => {
    const game = await Game.findByPk(req.params.id, {
      include: [
        { model: Studio, as: "studio" },
        { model: Platform, as: "platforms", through: { attributes: [] } },
      ],
    });
    if (!game) {
      return res.status(404).json({ error: req.t("messages.not_found") });
    }
    const obj = game.toJSON();
    obj.genreLabel = req.t("genre." + obj.genre);
    res.setHateoas(buildItemLinks(game));
    res.render(obj);
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
