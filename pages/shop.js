import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StoreNav from "../components/StoreNav";
import { money, useCart } from "./_app";

export default function Shop() {
  const { query } = useRouter();
  const cart = useCart();
  const [data, setData] = useState({ products: [], categories: [] });
  useEffect(() => {
    fetch("/api/bootstrap")
      .then((r) => r.json())
      .then(setData);
  }, []);
  const cat = data.categories.find((c) => c.slug === query.cat);
  const list = data.products.filter((p) => !cat || p.categoryId === cat.id);
  return (
    <>
      <StoreNav count={cart.count} />
      <div className="wrap section">
        <div className="kicker">Catalog</div>
        <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500 }}>{cat ? cat.name : "All products"}</h1>
        <div className="grid">
          {list.map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`} className="card">
              <div className="media">
                <img src={p.image} alt="" style={{ height: 150 }} />
              </div>
              <div className="body">
                <h3>{p.name}</h3>
                <span className="price">{money(p.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
