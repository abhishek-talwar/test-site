import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";
import { money } from "../_app";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const load = () => fetch("/api/orders").then((r) => r.json()).then(setOrders);
  useEffect(load, []);
  async function fulfill(id) {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fulfillment: "fulfilled", status: "complete" }),
    });
    load();
  }
  return (
    <AdminShell>
      <h1>Orders</h1>
      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Ship</th>
              <th>Pay</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.number}</td>
                <td>
                  {o.customer.name}
                  <br />
                  <small>{o.customer.email}</small>
                </td>
                <td>
                  {o.shipping.name}
                  <br />
                  <span className="badge">{o.fulfillment}</span>
                </td>
                <td>
                  {o.payment.provider}
                  <br />
                  <span className="badge ok">{o.status}</span>
                </td>
                <td>{money(o.total)}</td>
                <td>
                  {o.fulfillment !== "fulfilled" && (
                    <button className="btn" onClick={() => fulfill(o.id)}>
                      Fulfill
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
