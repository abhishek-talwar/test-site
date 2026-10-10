import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";

export default function Payments() {
  const [rows, setRows] = useState([]);
  const load = () => fetch("/api/payments/gateways").then((r) => r.json()).then(setRows);
  useEffect(load, []);
  async function toggle(g) {
    await fetch("/api/payments/gateways", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: g.id, enabled: !g.enabled }),
    });
    load();
  }
  return (
    <AdminShell>
      <h1>Payment gateways</h1>
      <p style={{ color: "var(--muted)" }}>
        Connect Stripe, PayPal, Razorpay, or cash on delivery. Keys stay in test/sandbox mode for this demo.
      </p>
      {rows.map((g) => (
        <div key={g.id} className="panel" style={{ marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
          <div>
            <b>{g.name}</b>
            <div>
              Mode: {g.mode || "live"} {g.publishableKey || g.clientId || g.keyId || ""}
            </div>
          </div>
          <button className="btn" onClick={() => toggle(g)}>
            {g.enabled ? "Enabled" : "Disabled"}
          </button>
        </div>
      ))}
    </AdminShell>
  );
}
