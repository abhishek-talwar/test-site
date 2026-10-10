import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StoreNav from "../components/StoreNav";
import { money, useCart } from "./_app";

export default function Checkout() {
  const cart = useCart();
  const router = useRouter();
  const [quotes, setQuotes] = useState([]);
  const [gateways, setGateways] = useState([]);
  const [shippingId, setShippingId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "", country: "IN" });
  const [err, setErr] = useState("");
  const sub = cart.items.reduce((a, b) => a + b.price * b.qty, 0);

  useEffect(() => {
    if (!cart.items.length) return;
    fetch("/api/shipping/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((r) => r.json())
      .then((q) => {
        setQuotes(q);
        if (q[0]) setShippingId(q[0].id);
      });
    fetch("/api/payments/gateways")
      .then((r) => r.json())
      .then((g) => {
        const on = g.filter((x) => x.enabled);
        setGateways(on);
        if (on[0]) setPaymentId(on[0].id);
      });
  }, [cart.items.length]);

  const ship = quotes.find((q) => q.id === shippingId);
  const gw = gateways.find((g) => g.id === paymentId);
  const fee = gw?.id === "cod" ? Number(gw.fee || 0) : 0;
  const total = sub + (ship?.amount || 0) + fee;

  async function place(e) {
    e.preventDefault();
    setErr("");
    const r = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart.items, shippingId, paymentId, customer: form }),
    });
    const data = await r.json();
    if (!r.ok) return setErr(data.error || "Failed");
    cart.clear();
    router.push(`/order/${data.id}`);
  }

  return (
    <>
      <StoreNav count={cart.count} />
      <div className="wrap section layout">
        <form className="panel" onSubmit={place}>
          <h2>Shipping details</h2>
          {["name", "email", "address", "city", "zip"].map((k) => (
            <div key={k}>
              <label>{k}</label>
              <input required value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
            </div>
          ))}
          <h3>Shipping</h3>
          {quotes.map((q) => (
            <label key={q.id} className="toggle">
              <input type="radio" checked={shippingId === q.id} onChange={() => setShippingId(q.id)} />
              {q.name} · {q.eta} · {money(q.amount)}
            </label>
          ))}
          <h3>Payment</h3>
          {gateways.map((g) => (
            <label key={g.id} className="toggle">
              <input type="radio" checked={paymentId === g.id} onChange={() => setPaymentId(g.id)} />
              {g.name} {g.mode ? `(${g.mode})` : ""}
            </label>
          ))}
          {err && <p style={{ color: "crimson" }}>{err}</p>}
          <button className="btn" style={{ marginTop: 16 }} type="submit">
            <span>Pay {money(total)}</span>
          </button>
        </form>
        <aside className="panel">
          <h3>Summary</h3>
          {cart.items.map((i) => (
            <p key={i.productId}>
              {i.name} × {i.qty}
            </p>
          ))}
          <p>Subtotal {money(sub)}</p>
          <p>Shipping {money(ship?.amount)}</p>
          {fee ? <p>COD fee {money(fee)}</p> : null}
          <p>
            <b>Total {money(total)}</b>
          </p>
          <small>GST included in prices.</small>
        </aside>
      </div>
    </>
  );
}
