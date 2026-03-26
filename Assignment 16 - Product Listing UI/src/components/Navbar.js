function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <h2>🛍️ Shop</h2>
      <p>Cart: {cartCount}</p>
    </nav>
  );
}

export default Navbar;