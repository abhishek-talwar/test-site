import Link from "next/link";
import StoreNav from "../components/StoreNav";
import { money, useCart } from "./_app";

export default function Cart() {
  const cart = useCart();
  const sub = cart.items.reduce((a, b) => a + b.price * b.qty, 0);
  return (
    <>
      <StoreNav count={cart.count} />
      <div className="wrap section">
        <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500 }}>Bag</h1>
        {!cart.items.length && <p>Your bag is empty.</p>}
        {cart.items.map((it) => (
          <div key={it.productId} className="panel" style={{ display: "flex", gap: 16, marginBottom: 12, alignItems: "center" }}>
            <img src={it.image} alt="" style={{ width: 72 }} />
            <div style={{ flex: 1 }}>
              <b>{it.name}</b>
              <div>{money(it.price)}</div>
            </div>
            <input
              type="number"
              min={0}
              value={it.qty}
              style={{ width: 70 }}
              onChange={(e) => cart.setQty(it.productId, Number(e.target.value))}
            />
          </div>
        ))}
        <p>
          Subtotal <b>{money(sub)}</b>
        </p>
        <Link className="btn" href="/checkout">
          Checkout
        </Link>
      </div>
    </>
  );
}
