import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StoreNav from "../../components/StoreNav";
import { money } from "../_app";

export default function Order() {
  const { query } = useRouter();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((list) => setOrder(list.find((o) => o.id === query.id)));
  }, [query.id]);
  if (!order) return null;
  return (
    <>
      <StoreNav />
      <div className="wrap section">
        <div className="kicker">Confirmation</div>
        <h1 className="display">Order {order.number}</h1>
        <p>
          Paid via {order.payment.provider} · {order.status}
        </p>
        <p>
          Ships with {order.shipping.name} ({order.shipping.eta})
        </p>
        {order.lines.map((l) => (
          <p key={l.productId}>
            {l.name} × {l.qty} — {money(l.price * l.qty)}
          </p>
        ))}
        <p>
          <b>Total {money(order.total)}</b>
        </p>
      </div>
    </>
  );
}
