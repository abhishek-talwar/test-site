import Link from "next/link";

export default function StoreNav({ count = 0 }) {
  return (
    <>
      <div className="announce">Free shipping over ₹4,999 · COD available · New drop live</div>
      <header className="nav-bar">
        <div className="wrap nav">
          <div className="nav-links">
            <Link href="/shop">Shop all</Link>
            <Link href="/shop?cat=t-shirts">T-shirts</Link>
            <Link href="/shop?cat=hoodies">Hoodies</Link>
            <Link href="/shop?cat=caps">Caps</Link>
          </div>
          <Link href="/" className="logo">
            BLUORNG
          </Link>
          <div className="nav-links right">
            <Link href="/shop?cat=polos">Polos</Link>
            <Link href="/shop?cat=bottoms">Bottoms</Link>
            <Link href="/cart">Bag {count ? `(${count})` : ""}</Link>
          </div>
        </div>
      </header>
    </>
  );
}
