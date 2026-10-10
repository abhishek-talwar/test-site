const { load, mutate } = require("../../lib/store");
const { v4: uuid } = require("uuid");

export default function handler(req, res) {
  if (req.method === "GET") {
    const db = load();
    return res.json(db.products);
  }
  if (req.method === "POST") {
    const p = req.body || {};
    const product = {
      id: uuid(),
      name: p.name || "Untitled",
      slug: (p.slug || p.name || "item").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sku: p.sku || `SKU-${Date.now()}`,
      price: Number(p.price || 0),
      compareAt: p.compareAt ? Number(p.compareAt) : null,
      stock: Number(p.stock || 0),
      weight: Number(p.weight || 1),
      categoryId: p.categoryId || "",
      featured: !!p.featured,
      status: p.status || "active",
      image: p.image || "/products/tee-grey.jpg",
      description: p.description || "",
    };
    mutate((db) => db.products.push(product));
    return res.status(201).json(product);
  }
  res.status(405).end();
}
