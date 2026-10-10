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
      <section className="hero-full">
        <img src="/hero.jpg" alt="" />
        <div className="overlay">
          <div className="kicker">Winter drop 2025</div>
          <h1>BLUORNG</h1>
          <p>Street style comfort. Top-drawer clothing. An extension of your expression.</p>
          <div className="hero-cta">
            <Link className="btn" href="/shop">
              Shop now
            </Link>
            <Link className="btn ghost" href="/shop?cat=hoodies" style={{ color: "#111" }}>
              Hoodies
            </Link>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="tiles">
          {[
            ["/products/cap.jpg", "New caps", "/shop?cat=caps"],
            ["/products/polo.jpg", "Polo season", "/shop?cat=polos"],
            ["/products/tee-black.jpg", "Black grid", "/shop?cat=t-shirts"],
            ["/products/hoodie-black.jpg", "Winter", "/shop?cat=hoodies"],
          ].map(([img, t, href]) => (
            <Link key={t} href={href} className="tile">
              <img src={img} alt="" />
              <span>{t}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          <span>BLUORNG · T-SHIRTS · HOODIES · BOTTOMS · CAPS · RAZORPAY · COD · FREE OVER ₹4999 · BLUORNG · T-SHIRTS · HOODIES · BOTTOMS · CAPS · </span>
          <span>BLUORNG · T-SHIRTS · HOODIES · BOTTOMS · CAPS · RAZORPAY · COD · FREE OVER ₹4999 · </span>
        </div>
      </div>

      <section className="section wrap">
        <div className="section-head">
          <div>
            <div className="kicker">Latest drop</div>
            <h2 className="display">New in</h2>
          </div>
          <Link href="/shop">Discover more</Link>
        </div>
        <div className="grid">
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`} className="card">
              <div className="media">
                <img src={p.image} alt="" />
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

      <footer className="foot wrap">
        <b className="logo" style={{ fontSize: 18 }}>
          BLUORNG
        </b>
        <div>
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Bag</Link>
        </div>
        <small>© {new Date().getFullYear()} Bluorng. Pronounced “Blue~Orange”.</small>
      </footer>
    </>
  );
}
