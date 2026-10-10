import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StoreNav from "../../components/StoreNav";
import { money, useCart } from "../_app";

export default function Product() {
  const { query, push } = useRouter();
  const cart = useCart();
  const [p, setP] = useState(null);
  useEffect(() => {
    if (!query.slug) return;
    fetch(`/api/products/${query.slug}`)
      .then((r) => r.json())
      .then(setP);
  }, [query.slug]);
  if (!p) return null;
  return (
    <>
      <StoreNav count={cart.count} />
      <div className="wrap section layout">
        <div className="card">
          <div className="media" style={{ height: 420 }}>
            <img src={p.image} alt="" style={{ height: 280 }} />
          </div>
        </div>
        <div>
          <div className="kicker">{p.sku}</div>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500 }}>{p.name}</h1>
          <p className="price" style={{ fontSize: 28 }}>
            {money(p.price)}
          </p>
          <p style={{ color: "var(--muted)" }}>{p.description}</p>
          <p>In stock: {p.stock}</p>
          <button
            className="btn"
            onClick={() => {
              cart.add(p);
              push("/cart");
            }}
          >
            Add to bag
          </button>
        </div>
      </div>
    </>
  );
}
