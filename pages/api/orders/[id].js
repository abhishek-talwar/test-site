const { mutate } = require("../../../lib/store");

export default function handler(req, res) {
  const { id } = req.query;
  if (req.method !== "PUT") return res.status(405).end();
  const order = mutate((db) => {
    const o = db.orders.find((x) => x.id === id);
    if (!o) return null;
    if (req.body.status) o.status = req.body.status;
    if (req.body.fulfillment) o.fulfillment = req.body.fulfillment;
    return o;
  });
  if (!order) return res.status(404).json({ error: "Not found" });
  res.json(order);
}
