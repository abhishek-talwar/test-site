import Link from "next/link";

export default function StoreNav({ count = 0 }) {
  return (
    <>
      <div className="announce">Drop 07 is live · Free ship over ₹4,999 · COD on every order</div>
      <header className="nav-bar">
        <div className="wrap nav">
          <div className="nav-links">
            <Link href="/shop">Index</Link>
            <Link href="/shop?cat=hoodies">Hoodies</Link>
            <Link href="/shop?cat=t-shirts">Tees</Link>
          </div>
          <Link href="/" className="logo">
            BLU<em>ORNG</em>
          </Link>
          <div className="nav-links">
            <Link href="/shop?cat=caps">Caps</Link>
            <Link href="/cart">Bag {count ? `0${count}` : "00"}</Link>
          </div>
        </div>
      </header>
    </>
  );
}
