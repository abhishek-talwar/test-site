const { load, mutate } = require("../../lib/store");
const { v4: uuid } = require("uuid");

export default function handler(req, res) {
  if (req.method === "GET") return res.json(load().categories);
  if (req.method === "POST") {
    const c = {
      id: uuid(),
      name: req.body.name,
      slug: (req.body.slug || req.body.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };
    mutate((db) => db.categories.push(c));
    return res.status(201).json(c);
  }
  res.status(405).end();
}
