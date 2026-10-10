import Link from "next/link";

export default function StoreNav({ count = 0 }) {
  return (
    <div className="wrap">
      <nav className="nav">
        <Link href="/" className="logo">
          Lumen
        </Link>
        <div className="nav-links">
          <Link href="/shop">Shop</Link>
          <Link href="/shop?cat=lighting">Lighting</Link>
          <Link href="/shop?cat=furniture">Furniture</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/cart">Bag ({count})</Link>
        </div>
      </nav>
    </div>
  );
}
