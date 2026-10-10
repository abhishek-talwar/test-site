function quoteShipping(connectors, { weight = 1, subtotal = 0 }) {
  return connectors
    .filter((c) => c.enabled)
    .map((c) => {
      let amount = 0;
      if (c.type === "free") {
        if (subtotal < (c.minSubtotal || 0)) return null;
        amount = 0;
      } else if (c.type === "flat") {
        amount = Number(c.rate || 0);
      } else if (c.type === "carrier") {
        amount = Number(c.base || 0) + Number(c.perKg || 0) * Number(weight);
      }
      return {
        id: c.id,
        name: c.name,
        type: c.type,
        eta: c.eta,
        amount: Math.round(amount * 100) / 100,
      };
    })
    .filter(Boolean);
}

function processPayment(gateway, amount) {
  if (!gateway || !gateway.enabled) {
    return { ok: false, error: "Gateway unavailable" };
  }
  const id = `pay_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  if (gateway.id === "cod") {
    return { ok: true, status: "pending", id, provider: "cod" };
  }
  return {
    ok: true,
    status: "paid",
    id,
    provider: gateway.id,
    mode: gateway.mode || "test",
    amount,
  };
}

module.exports = { quoteShipping, processPayment };
