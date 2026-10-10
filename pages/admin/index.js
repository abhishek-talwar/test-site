import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";
import { money } from "../_app";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/orders").then((r) => r.json()).then(setOrders);
    fetch("/api/products").then((r) => r.json()).then(setProducts);
  }, []);
  const revenue = orders.reduce((a, o) => a + o.total, 0);
  return (
    <AdminShell>
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat">
          <span>Revenue</span>
          <b>{money(revenue)}</b>
        </div>
        <div className="stat">
          <span>Orders</span>
          <b>{orders.length}</b>
        </div>
        <div className="stat">
          <span>SKUs</span>
          <b>{products.length}</b>
        </div>
        <div className="stat">
          <span>Low stock</span>
          <b>{products.filter((p) => p.stock < 10).length}</b>
        </div>
      </div>
      <div className="panel">
        <h3>Recent orders</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 8).map((o) => (
              <tr key={o.id}>
                <td>{o.number}</td>
                <td>{o.customer.name}</td>
                <td>{money(o.total)}</td>
                <td>
                  <span className="badge ok">{o.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
