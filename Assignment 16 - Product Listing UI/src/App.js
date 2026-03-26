import React, { useState } from "react";
import productsData from "./data/products";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  // Add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Filter + Search
  const filteredProducts = productsData
    .filter((p) =>
      filter === "All" ? true : p.category === filter
    )
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      <Navbar cartCount={cart.length} />

      <div className="container">
        <h1>Product Listing</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filters */}
        <div className="filters">
          <button onClick={() => setFilter("All")}>All</button>
          <button onClick={() => setFilter("Electronics")}>
            Electronics
          </button>
          <button onClick={() => setFilter("Clothing")}>
            Clothing
          </button>
        </div>

        {/* Products */}
        <div className="grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;