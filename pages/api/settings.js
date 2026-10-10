const { load, mutate } = require("../../lib/store");

export default function handler(req, res) {
  if (req.method === "GET") return res.json(load().settings);
  if (req.method === "PUT") {
    const s = mutate((db) => {
      db.settings = { ...db.settings, ...req.body };
      return db.settings;
    });
    return res.json(s);
  }
  res.status(405).end();
}
