import { useState } from "react";
import { useRouter } from "next/router";
import AdminShell from "../../components/AdminShell";

export default function Login() {
  const [email, setEmail] = useState("admin@lumen.store");
  const [password, setPassword] = useState("admin123");
  const [err, setErr] = useState("");
  const router = useRouter();
  async function submit(e) {
    e.preventDefault();
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const d = await r.json();
    if (!r.ok) return setErr(d.error);
    localStorage.setItem("lumen-admin", d.token);
    router.push("/admin");
  }
  return (
    <AdminShell>
      <div className="wrap" style={{ maxWidth: 420, paddingTop: 80 }}>
        <div className="panel">
          <h1>Admin</h1>
          <form onSubmit={submit}>
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {err && <p style={{ color: "crimson" }}>{err}</p>}
            <button className="btn" style={{ marginTop: 16 }} type="submit">
              Sign in
            </button>
          </form>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>Demo: admin@lumen.store / admin123</p>
        </div>
      </div>
    </AdminShell>
  );
}
