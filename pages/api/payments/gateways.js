const { load, mutate } = require("../../../lib/store");

export default function handler(req, res) {
  if (req.method === "GET") {
    const g = load().payments.gateways.map(({ secretKey, secret, keySecret, ...rest }) => rest);
    return res.json(g);
  }
  if (req.method === "PUT") {
    const { id, ...rest } = req.body || {};
    const updated = mutate((db) => {
      const i = db.payments.gateways.findIndex((c) => c.id === id);
      if (i < 0) return null;
      db.payments.gateways[i] = { ...db.payments.gateways[i], ...rest, id };
      return db.payments.gateways[i];
    });
    return res.json(updated);
  }
  res.status(405).end();
}
