import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";
import { money } from "../_app";

const empty = {
  name: "",
  sku: "",
  price: 0,
  stock: 0,
  weight: 1,
  categoryId: "",
  description: "",
  image: "/products/vessel.svg",
  status: "active",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [form, setForm] = useState(empty);
  const load = () => {
    fetch("/api/products").then((r) => r.json()).then(setProducts);
    fetch("/api/categories").then((r) => r.json()).then(setCats);
  };
  useEffect(load, []);
  async function save(e) {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(empty);
    load();
  }
  async function remove(id) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    load();
  }
  async function toggle(p) {
    await fetch(`/api/products/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: p.status === "active" ? "draft" : "active" }),
    });
    load();
  }
  return (
    <AdminShell>
      <h1>Products</h1>
      <div className="layout">
        <div className="panel">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.sku}</td>
                  <td>{money(p.price)}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button className="btn ghost" onClick={() => toggle(p)}>
                      {p.status}
                    </button>{" "}
                    <button className="btn ghost" onClick={() => remove(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form className="panel" onSubmit={save}>
          <h3>Add product</h3>
          <label>Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <label>SKU</label>
          <input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
          <label>Price</label>
          <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <label>Stock</label>
          <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          <label>Weight (kg)</label>
          <input type="number" step="0.1" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
          <label>Category</label>
          <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
            <option value="">—</option>
            {cats.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <label>Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button className="btn" style={{ marginTop: 16 }} type="submit">
            Create
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
