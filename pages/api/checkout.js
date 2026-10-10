const { load, mutate } = require("../../lib/store");
const { quoteShipping, processPayment } = require("../../lib/commerce");
const { v4: uuid } = require("uuid");

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const db = load();
  const { items = [], shippingId, paymentId, customer } = req.body || {};
  const lines = [];
  let subtotal = 0;
  let weight = 0;
  for (const it of items) {
    const p = db.products.find((x) => x.id === it.productId);
    if (!p || p.status !== "active") continue;
    const qty = Math.max(1, Number(it.qty || 1));
    if (p.stock < qty) return res.status(400).json({ error: `Insufficient stock for ${p.name}` });
    lines.push({
      productId: p.id,
      name: p.name,
      qty,
      price: p.price,
      image: p.image,
    });
    subtotal += p.price * qty;
    weight += p.weight * qty;
  }
  if (!lines.length) return res.status(400).json({ error: "Cart is empty" });

  const quotes = quoteShipping(db.shipping.connectors, { weight, subtotal });
  const ship = quotes.find((q) => q.id === shippingId) || quotes[0];
  if (!ship) return res.status(400).json({ error: "No shipping method" });

  const gateway = db.payments.gateways.find((g) => g.id === paymentId && g.enabled);
  const tax = Math.round(subtotal * (db.settings.taxRate || 0) * 100) / 100;
  const total = Math.round((subtotal + ship.amount + tax + (gateway?.id === "cod" ? Number(gateway.fee || 0) : 0)) * 100) / 100;
  const pay = processPayment(gateway, total);
  if (!pay.ok) return res.status(400).json({ error: pay.error });

  const order = {
    id: uuid(),
    number: `LM-${1000 + db.orders.length + 1}`,
    createdAt: new Date().toISOString(),
    status: pay.status === "paid" ? "paid" : "pending",
    fulfillment: "unfulfilled",
    customer: {
      name: customer?.name || "Guest",
      email: customer?.email || "",
      address: customer?.address || "",
      city: customer?.city || "",
      country: customer?.country || "US",
      zip: customer?.zip || "",
    },
    lines,
    subtotal,
    shipping: ship,
    tax,
    total,
    payment: pay,
  };

  mutate((d) => {
    d.orders.unshift(order);
    for (const l of lines) {
      const p = d.products.find((x) => x.id === l.productId);
      if (p) p.stock = Math.max(0, p.stock - l.qty);
    }
    if (order.customer.email) {
      const existing = d.customers.find((c) => c.email === order.customer.email);
      if (existing) {
        existing.orders += 1;
        existing.spent += total;
      } else {
        d.customers.push({
          id: uuid(),
          name: order.customer.name,
          email: order.customer.email,
          orders: 1,
          spent: total,
        });
      }
    }
  });

  res.status(201).json(order);
}
