import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import { useRandom } from "../hooks/useRandom";

const Checkout = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { randomIndex } = useRandom()

  const {
    getCartItemsWithProducts,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    clearCart,
  } = useCart();

  const cartItems = getCartItemsWithProducts();
  const total = getCartTotal();

  function placeOrder() {
    alert("successful order");
    clearCart();
    setOrderPlaced(true);
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>
            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img
                  src={item.product.images[randomIndex(item.product.images.length)]}
                  alt={item.product.title}
                  className="checkout-item-image"
                />
                <div className="checkout-item-details">
                  <h3 className="checkout-item-title">{item.product.title}</h3>
                  <p className="checkout-item-price">
                    ${item.product.price} each
                  </p>
                </div>
                <div className="checkout-item-controls">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>

                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <p className="checkout-item-total">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-secondary btn-small"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-summary">
            <h2 className="checkout-section-title">Total</h2>
            <div className="checkout-total">
              <p className="checkout-total-label">Subtotal:</p>
              <p className="checkout-total-value">${total.toFixed(2)}</p>
            </div>
            <div className="checkout-total">
              <p className="checkout-total-label">Total:</p>
              <p className="checkout-total-value checkout-total-final">
                ${total.toFixed(2)}
              </p>
            </div>
            {!orderPlaced && <button
              className="btn btn-cta btn-large btn-block"
              onClick={placeOrder}
            >
              Place Order
            </button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
