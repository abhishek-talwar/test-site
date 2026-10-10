const { load } = require("../../../lib/store");

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password } = req.body || {};
  const a = load().admin;
  if (email === a.email && password === a.password) {
    return res.json({ ok: true, token: "lumen-admin-demo" });
  }
  res.status(401).json({ error: "Invalid credentials" });
}
