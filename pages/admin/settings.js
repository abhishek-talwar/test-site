import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";

export default function Settings() {
  const [s, setS] = useState(null);
  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then(setS);
  }, []);
  if (!s) return null;
  async function save(e) {
    e.preventDefault();
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    alert("Saved");
  }
  return (
    <AdminShell>
      <h1>Settings</h1>
      <form className="panel" onSubmit={save} style={{ maxWidth: 480 }}>
        <label>Store name</label>
        <input value={s.storeName} onChange={(e) => setS({ ...s, storeName: e.target.value })} />
        <label>Tagline</label>
        <input value={s.tagline} onChange={(e) => setS({ ...s, tagline: e.target.value })} />
        <label>Email</label>
        <input value={s.email} onChange={(e) => setS({ ...s, email: e.target.value })} />
        <label>Tax rate</label>
        <input type="number" step="0.01" value={s.taxRate} onChange={(e) => setS({ ...s, taxRate: Number(e.target.value) })} />
        <button className="btn" style={{ marginTop: 16 }} type="submit">
          Save
        </button>
      </form>
    </AdminShell>
  );
}
