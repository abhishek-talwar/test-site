import "../styles/globals.css";
import { useEffect, useState } from "react";

export const money = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n || 0);

export function useCart() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem("lumen-cart") || "[]"));
    } catch {}
  }, []);
  const persist = (next) => {
    setItems(next);
    localStorage.setItem("lumen-cart", JSON.stringify(next));
  };
  return {
    items,
    count: items.reduce((a, b) => a + b.qty, 0),
    add: (product, qty = 1) => {
      const next = [...items];
      const i = next.findIndex((x) => x.productId === product.id);
      if (i >= 0) next[i].qty += qty;
      else
        next.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        });
      persist(next);
    },
    setQty: (id, qty) => persist(items.map((x) => (x.productId === id ? { ...x, qty } : x)).filter((x) => x.qty > 0)),
    clear: () => persist([]),
  };
}

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
