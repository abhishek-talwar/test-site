const { load, mutate } = require("../../../lib/store");

export default function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    const p = load().products.find((x) => x.id === id || x.slug === id);
    if (!p) return res.status(404).json({ error: "Not found" });
    return res.json(p);
  }
  if (req.method === "PUT") {
    const updated = mutate((db) => {
      const i = db.products.findIndex((x) => x.id === id);
      if (i < 0) return null;
      db.products[i] = { ...db.products[i], ...req.body, id };
      return db.products[i];
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    return res.json(updated);
  }
  if (req.method === "DELETE") {
    mutate((db) => {
      db.products = db.products.filter((x) => x.id !== id);
    });
    return res.json({ ok: true });
  }
  res.status(405).end();
}
