const { load } = require("../../lib/store");
export default function handler(req, res) {
  const db = load();
  res.json({
    settings: db.settings,
    categories: db.categories,
    products: db.products.filter((p) => p.status === "active"),
    gateways: db.payments.gateways.filter((g) => g.enabled).map(({ secretKey, secret, keySecret, ...r }) => r),
  });
}
