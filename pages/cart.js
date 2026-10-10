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
        <h1 className="display">Your bag</h1>
        {!cart.items.length && (
          <p>
            Your bag is empty. <Link href="/shop">Let’s get started</Link>
          </p>
        )}
        {cart.items.map((it) => (
          <div key={it.productId} className="line-item">
            <img src={it.image} alt="" />
            <div>
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
        {!!cart.items.length && (
          <>
            <p>
              Estimated total <b>{money(sub)}</b>
            </p>
            <p style={{ color: "var(--muted)", fontSize: 13 }}>Taxes included. Shipping calculated at checkout.</p>
            <Link className="btn" href="/checkout">
              Check out
            </Link>
          </>
        )}
      </div>
    </>
  );
}
