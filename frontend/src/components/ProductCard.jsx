import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart } = useCart();

  const productInCart = cartItems.find((item) => item.id === product.id);
  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";

  return (
    <div className="product-card">
      <img
        className="product-card-image"
        src={product.images[0]}
        alt={product.title}
      />
      <div className="product-images-navigation"></div>
      <div className="product-card-content">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-description">
          {product.description?.slice(0, 100)}{" "}
          <Link className="link" to={`/product/${product.id}`}>
            {" "}
            <span className="product-card-show-more-text">show more...</span>
          </Link>
        </p>
        <div className="product-card-mid-section">
          <p className="product-card-price">${product.price}</p>
          <button className="btn product-card-wishlist">
            <FaRegHeart />
            Wishlist
          </button>
        </div>
        <div className="product-card-bottom-section">
          <Link to={`/product/${product.id}`} className="btn btn-secondary">
            View Details
          </Link>
          <button
            className="btn btn-cta product-card-add-to-cart-btn"
            onClick={() => addToCart(product.id)}
          >
            <FaShoppingCart />
            Add to cart {productQuantityLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
