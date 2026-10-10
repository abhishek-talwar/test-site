import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";

export default function Shipping() {
  const [rows, setRows] = useState([]);
  const load = () => fetch("/api/shipping/connectors").then((r) => r.json()).then(setRows);
  useEffect(load, []);
  async function toggle(c) {
    await fetch("/api/shipping/connectors", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id, enabled: !c.enabled }),
    });
    load();
  }
  return (
    <AdminShell>
      <h1>Shipping connectors</h1>
      <p style={{ color: "var(--muted)" }}>
        Free, flat-rate, and live-style carrier quotes for UPS, FedEx, and DHL (demo calculators).
      </p>
      {rows.map((c) => (
        <div key={c.id} className="panel" style={{ marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
          <div>
            <b>{c.name}</b>
            <div>
              {c.type} · {c.eta}
              {c.rate != null ? ` · $${c.rate}` : ""}
              {c.base != null ? ` · base $${c.base} + $${c.perKg}/kg` : ""}
              {c.minSubtotal ? ` · free over $${c.minSubtotal}` : ""}
            </div>
          </div>
          <button className="btn" onClick={() => toggle(c)}>
            {c.enabled ? "Enabled" : "Disabled"}
          </button>
        </div>
      ))}
    </AdminShell>
  );
}
