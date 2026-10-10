const { load } = require("../../../lib/store");
const { quoteShipping } = require("../../../lib/commerce");

export default function handler(req, res) {
  const db = load();
  const { items = [] } = req.body || {};
  const products = db.products;
  let weight = 0;
  let subtotal = 0;
  for (const it of items) {
    const p = products.find((x) => x.id === it.productId);
    if (!p) continue;
    const qty = Number(it.qty || 1);
    weight += p.weight * qty;
    subtotal += p.price * qty;
  }
  res.json(quoteShipping(db.shipping.connectors, { weight, subtotal }));
}
