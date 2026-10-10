import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const links = [
  ["Dashboard", "/admin"],
  ["Products", "/admin/products"],
  ["Orders", "/admin/orders"],
  ["Customers", "/admin/customers"],
  ["Payments", "/admin/payments"],
  ["Shipping", "/admin/shipping"],
  ["Settings", "/admin/settings"],
];

export default function AdminShell({ children }) {
  const { pathname, push } = useRouter();
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname === "/admin/login") return;
    if (localStorage.getItem("lumen-admin") !== "lumen-admin-demo") push("/admin/login");
  }, [pathname, push]);
  if (pathname === "/admin/login") return children;
  return (
    <div className="admin">
      <aside className="side">
        <div className="logo" style={{ color: "#fff", padding: "0 12px 24px" }}>
          Lumen
        </div>
        {links.map(([label, href]) => (
          <Link key={href} href={href} className={pathname === href ? "active" : ""}>
            {label}
          </Link>
        ))}
        <Link href="/">View store</Link>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
