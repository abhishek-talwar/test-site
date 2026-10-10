import Link from "next/link";
import { useEffect, useState } from "react";
import StoreNav from "../components/StoreNav";
import { money, useCart } from "./_app";

export default function Home() {
  const [products, setProducts] = useState([]);
  const cart = useCart();
  useEffect(() => {
    fetch("/api/bootstrap")
      .then((r) => r.json())
      .then((d) => setProducts(d.products.filter((p) => p.featured)));
  }, []);
  return (
    <>
      <StoreNav count={cart.count} />
      <div className="wrap">
        <section className="hero">
          <div>
            <div className="kicker">Spring collection</div>
            <h1>Quiet objects for brighter rooms.</h1>
            <p>
              Furniture, lighting, and textiles designed to last — with live shipping quotes and
              multiple payment gateways at checkout.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <Link className="btn" href="/shop">
                Shop the collection
              </Link>
              <Link className="btn ghost" href="/admin">
                Open admin
              </Link>
            </div>
          </div>
          <div className="card" style={{ padding: 28 }}>
            <div className="kicker">Featured</div>
            <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 36, margin: "8px 0" }}>
              Arc Floor Lamp
            </h2>
            <p style={{ color: "var(--muted)" }}>Steel, linen, and a dimmer that actually feels considered.</p>
            <img src="/products/lamp.svg" alt="" style={{ height: 220, margin: "12px auto" }} />
          </div>
        </section>
        <section className="section">
          <div className="kicker">Edit</div>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500 }}>In the studio</h2>
          <div className="grid">
            {products.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="card">
                <div className="media">
                  <img src={p.image} alt="" style={{ height: 160 }} />
                </div>
                <div className="body">
                  <h3>{p.name}</h3>
                  <span className="price">{money(p.price)}</span>
                  {p.compareAt ? <span className="compare">{money(p.compareAt)}</span> : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
