import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import { badgeContext } from "../Context/BadgeState";
import { cartContext } from "../Context/CartState";
import Footer from "./Footer";
import { getProduct } from "../services/api";

function Products() {
  const { cart, setCart } = useContext(cartContext);
  const { badgeCount, setBadgeCount } = useContext(badgeContext);

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getProductDetails();

    const storedBadgeCount = localStorage.getItem("badgeCount");
    if (storedBadgeCount) {
      setBadgeCount(parseInt(storedBadgeCount));
    }
  }, []);

  const getProductDetails = async () => {
    const result = await getProduct();

    if (result) {
      setProducts(result.data);
    } else {
      alert("Something went wrong");
    }
  };

  const handleAddToCart = (productId) => {
    const productToAdd = products.find((product) => product.productId === productId);
  
    if (productToAdd) {
      setCart([...cart, productToAdd]);
      setBadgeCount(badgeCount + 1);
  
      const updatedCart = [...cart, productToAdd];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };
  

  useEffect(() => {
    localStorage.setItem("badgeCount", badgeCount.toString());
  }, [badgeCount]);

  const linkStyles = {
    textDecoration: "none",
    color: "black",
  };

  const buttonStyles = {
    margin: "5px",
  };

  const sidebarOptions = ["All", "Shirts", "Shorts", "Joggers", "Underwear", "Jeans"];

  return (
    <>
      <div className="row">
        <Header />
      </div>
      <div className="row">
      <nav
  id="sidebar"
  className="col-md-3 mt-3 bg-dark shadow bg-body-tertiary"
  style={{ display: "flex", flexDirection: "column" }}
>
  <div className="position-sticky">
    <ul className="list-group text-center">
      {sidebarOptions.map((option) => (
        <li
          key={option}
          className="list-group-item d-flex justify-content-center align-items-center"
          style={{ cursor: "pointer", padding: "0.75rem", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
          onClick={() => setSelectedCategory(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  </div>
</nav>



        <div className="col-md-9">
          <div className="row mt-3">
            {products.map((product) => (
              <div key={product.productId} className="col-md-3">
                <div className="card mb-4 shadow">
                  <img
                    src={product.productImageURL}
                    className="card-img-top"
                    alt={product.category}
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.productCategory}
                      {/* Size buttons and other product details */}
                    </h5>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <strong>Price: ${product.productPrice}</strong>
                    <div className="btn-group">
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => handleAddToCart(product.productId)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
