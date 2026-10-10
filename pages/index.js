import Link from "next/link";
import { useEffect, useState } from "react";
import StoreNav from "../components/StoreNav";
import { money, useCart } from "./_app";

const testimonials = [
  { q: "The lamp changed how our living room feels after dark.", n: "Maya R.", c: "Brooklyn" },
  { q: "Checkout was painless — UPS rates, paid with PayPal, arrived in three days.", n: "James K.", c: "Austin" },
  { q: "Quiet, well-made pieces. We keep coming back for gifts.", n: "Priya S.", c: "London" },
];

function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    requestAnimationFrame(() => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) el.classList.add("in");
      });
    });
    return () => io.disconnect();
  }, deps);
}

function Countdown() {
  const [left, setLeft] = useState({ h: 11, m: 42, s: 18 });
  useEffect(() => {
    const t = setInterval(() => {
      setLeft((p) => {
        let s = p.s - 1,
          m = p.m,
          h = p.h;
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) return { h: 11, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className="count">
      {[left.h, left.m, left.s].map((n, i) => (
        <span key={i} className="count-cell">
          {pad(n)}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const cart = useCart();
  useReveal([products.length]);
  useEffect(() => {
    fetch("/api/bootstrap")
      .then((r) => r.json())
      .then((d) => setProducts(d.products.filter((p) => p.featured)));
  }, []);

  return (
    <div className="land">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <StoreNav count={cart.count} />

      <section className="hero wrap">
        <div className="hero-copy">
          <div className="pill reveal">Free shipping over $250 · Easy returns</div>
          <h1 className="reveal d1">
            Rooms that <em>glow</em>
            <br />
            with intention.
          </h1>
          <p className="reveal d2">
            Lighting, furniture, and textiles made to last. Secure checkout, live carrier rates,
            and pieces you will still love in ten years.
          </p>
          <div className="hero-cta reveal d3">
            <Link className="btn shine" href="/shop">
              Shop the collection
            </Link>
            <a className="btn ghost" href="#story">
              See why people stay
            </a>
          </div>
          <div className="trust reveal d4">
            <div>
              <b>12k+</b> homes
            </div>
            <div>
              <b>4.9</b> rating
            </div>
            <div>
              <b>3–5d</b> delivery
            </div>
          </div>
        </div>
        <div className="hero-stage">
          <div className="float f1 card">
            <img src="/products/lamp.svg" alt="" />
            <span>Arc Lamp · $289</span>
          </div>
          <div className="float f2 card">
            <img src="/products/chair.svg" alt="" />
            <span>Oak Chair · $640</span>
          </div>
          <div className="float f3 card">
            <img src="/products/pendant.svg" alt="" />
            <span>Globe · $165</span>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              Stripe · PayPal · UPS · FedEx · Free over $250 · Hand-finished · Carbon-aware packing ·
            </span>
          ))}
        </div>
      </div>

      <section className="section wrap" id="story">
        <div className="kicker reveal">Why Lumen</div>
        <h2 className="display reveal">From first glance to the front door.</h2>
        <div className="reasons">
          {[
            ["Designed, not decorated", "Fewer, better objects. Every SKU is photographed, weighted, and stocked for real shipping quotes."],
            ["Pay how you live", "Stripe, PayPal, Razorpay, or cash on delivery — toggled live from the admin."],
            ["Carriers that quote", "UPS, FedEx, express, or free when you spend $250. Rates update with cart weight."],
          ].map(([t, d], i) => (
            <article className={`panel reveal d${i + 1}`} key={t}>
              <div className="num">0{i + 1}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <div>
            <div className="kicker reveal">Best sellers</div>
            <h2 className="display reveal">Add something quiet to the room.</h2>
          </div>
          <Link className="btn ghost reveal" href="/shop">
            View all
          </Link>
        </div>
        <div className="grid shop-grid">
          {products.map((p, i) => (
            <Link key={p.id} href={`/product/${p.slug}`} className={`card product-card reveal d${(i % 4) + 1}`}>
              <div className="media">
                <img src={p.image} alt="" />
              </div>
              <div className="body">
                <h3>{p.name}</h3>
                <span className="price">{money(p.price)}</span>
                {p.compareAt ? <span className="compare">{money(p.compareAt)}</span> : null}
                <span className="add-hint">Shop now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="offer wrap reveal">
        <div>
          <div className="kicker">Limited drop</div>
          <h2 className="display">Spring edit ends tonight.</h2>
          <p>Members get first look plus free ground shipping on the first order.</p>
          <Countdown />
          <Link className="btn accent shine" href="/shop">
            Claim the edit
          </Link>
        </div>
        <img src="/products/throw.svg" alt="" />
      </section>

      <section className="section wrap">
        <div className="kicker reveal">Voices</div>
        <h2 className="display reveal">Customers, not traffic.</h2>
        <div className="quotes">
          {testimonials.map((t, i) => (
            <blockquote className={`panel reveal d${i + 1}`} key={t.n}>
              <p>“{t.q}”</p>
              <cite>
                {t.n} · {t.c}
              </cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="cta-band wrap reveal">
        <div>
          <h2 className="display">10% off your first order.</h2>
          <p>Join the list. No noise — just drops, shipping notes, and care guides.</p>
        </div>
        {joined ? (
          <p className="joined">You’re in. See you in the inbox.</p>
        ) : (
          <form
            className="join"
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setJoined(true);
            }}
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn shine" type="submit">
              Get 10%
            </button>
          </form>
        )}
      </section>

      <footer className="foot wrap">
        <span className="logo">Lumen</span>
        <div>
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Bag</Link>
          <Link href="/admin">Admin</Link>
        </div>
        <small>© {new Date().getFullYear()} Lumen. Made to convert, then to last.</small>
      </footer>
    </div>
  );
}
