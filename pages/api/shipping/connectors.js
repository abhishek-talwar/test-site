const { load, mutate } = require("../../../lib/store");

export default function handler(req, res) {
  if (req.method === "GET") return res.json(load().shipping.connectors);
  if (req.method === "PUT") {
    const { id, ...rest } = req.body || {};
    const updated = mutate((db) => {
      const i = db.shipping.connectors.findIndex((c) => c.id === id);
      if (i < 0) return null;
      db.shipping.connectors[i] = { ...db.shipping.connectors[i], ...rest, id };
      return db.shipping.connectors[i];
    });
    return res.json(updated);
  }
  res.status(405).end();
}
