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
      .then((d) => setProducts(d.products));
  }, []);
  const drop = products.filter((p) => p.featured);

  return (
    <>
      <StoreNav count={cart.count} />
      <section className="hero-mash">
        <div className="shot">
          <img src="/hero.jpg" alt="" />
          <div className="stamp">
            pronounced
            <br />
            blue~orange
            <br />
            est. 2019
          </div>
        </div>
        <div className="hero-copy">
          <div className="tag">// streetwear from Delhi, not a template</div>
          <h1>
            <span className="b">BLU</span>
            <br />
            <span className="o">ORNG</span>
          </h1>
          <p>
            Loud graphics. Heavy gsm. Fits that hang off the shoulder like you meant it. This is not
            another beige catalog — it’s a drop.
          </p>
          <div className="hero-cta">
            <Link className="btn" href="/shop">
              <span>Enter the drop</span>
            </Link>
            <Link className="btn ghost" href="/shop?cat=hoodies">
              <span>Wildloom hoodies</span>
            </Link>
          </div>
          <div className="stats-row">
            <div>
              <b>400</b>gsm french terry
            </div>
            <div>
              <b>07</b>live styles
            </div>
            <div>
              <b>COD</b>+ Razorpay
            </div>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden>
        <span>NO BORING BASICS — ONLY GRAPHICS THAT ARGUE — HEAVYWEIGHT ONLY — DELHI NIGHT SHIFT — </span>
        <span>NO BORING BASICS — ONLY GRAPHICS THAT ARGUE — HEAVYWEIGHT ONLY — DELHI NIGHT SHIFT — </span>
      </div>

      <section className="section wrap">
        <div className="kicker">Rooms in the house</div>
        <h2 className="display">Pick a lane.</h2>
        <div className="mosaic">
          <Link href="/shop?cat=hoodies" className="tile">
            <img src="/products/hoodie-black.jpg" alt="" />
            <i>Hoodies</i>
          </Link>
          <Link href="/shop?cat=t-shirts" className="tile">
            <img src="/products/tee-black.jpg" alt="" />
            <i>Tees</i>
          </Link>
          <Link href="/shop?cat=caps" className="tile">
            <img src="/products/cap.jpg" alt="" />
            <i>Caps</i>
          </Link>
          <Link href="/shop?cat=polos" className="tile">
            <img src="/products/polo.jpg" alt="" />
            <i>Polos</i>
          </Link>
          <Link href="/shop?cat=bottoms" className="tile">
            <img src="/products/cargo.jpg" alt="" />
            <i>Cargos</i>
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <div className="kicker">Latest drop — scroll it</div>
        <h2 className="display">Don’t browse. Raid.</h2>
        <div className="rail">
          {drop.map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`} className="card">
              <div className="media">
                <img src={p.image} alt="" />
              </div>
              <div className="quick">ADD</div>
              <div className="body">
                <h3>{p.name}</h3>
                <span className="price">{money(p.price)}</span>
                {p.compareAt ? <span className="compare">{money(p.compareAt)}</span> : null}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="slash">
        <h2>
          Blue
          <br />
          meets
          <br />
          orange.
        </h2>
        <div>
          <p>
            Named for the clash — cold navy, hot rust. Every piece is cut oversized, printed in-house
            energy, shipped pan-India with live carrier quotes and COD if that’s how you move.
          </p>
          <Link className="btn" href="/shop" style={{ marginTop: 18 }}>
            <span>Shop the clash</span>
          </Link>
        </div>
      </section>

      <footer className="foot wrap">
        <div>
          <div className="big">
            BLU
            <br />
            ORNG
          </div>
          <p>An extension of your expression. Not a theme.</p>
        </div>
        <div>
          <Link href="/shop">All product</Link>
          <Link href="/shop?cat=hoodies">Hoodies</Link>
          <Link href="/shop?cat=t-shirts">T-shirts</Link>
          <Link href="/cart">Bag</Link>
        </div>
        <div>
          <p>GST in. Free over ₹4,999.</p>
          <p>Staff door is not on this site.</p>
        </div>
      </footer>
    </>
  );
}
