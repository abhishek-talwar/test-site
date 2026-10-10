import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";
import { money } from "../_app";

export default function Customers() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetch("/api/customers").then((r) => r.json()).then(setRows);
  }, []);
  return (
    <AdminShell>
      <h1>Customers</h1>
      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Spent</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.orders}</td>
                <td>{money(c.spent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
