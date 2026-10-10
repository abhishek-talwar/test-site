import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StoreNav from "../../components/StoreNav";
import { money, useCart } from "../_app";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function Product() {
  const { query, push } = useRouter();
  const cart = useCart();
  const [p, setP] = useState(null);
  const [size, setSize] = useState("M");
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
      <div className="wrap product-hero">
        <div className="shot">
          <img src={p.image} alt="" />
        </div>
        <div>
          <div className="kicker">{p.sku}</div>
          <h1 className="display">{p.name}</h1>
          <p className="price" style={{ fontSize: 22 }}>
            {money(p.price)}
          </p>
          {p.compareAt ? <p className="compare">{money(p.compareAt)}</p> : null}
          <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>{p.description}</p>
          <div className="kicker">Size</div>
          <div className="sizes">
            {sizes.map((s) => (
              <button key={s} className={size === s ? "on" : ""} type="button" onClick={() => setSize(s)}>
                {s}
              </button>
            ))}
          </div>
          <p>In stock: {p.stock}</p>
          <button
            className="btn"
            onClick={() => {
              cart.add(p);
              push("/cart");
            }}
          >
            <span>Add to bag</span>
          </button>
        </div>
      </div>
    </>
  );
}
