import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mosaic } from "react-loading-indicators";
// import { getProductById } from "../data/fetchData";
import { getProductById } from "../services/productService"
import { useRandom } from "../hooks/useRandom";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const navigate = useNavigate();
  const { randomIndex } = useRandom();

  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    async function getProduct() {
      const foundProduct = await getProductById(id);
      if (!foundProduct) {
        navigate("/");
      } else {
        setProduct(foundProduct);
      }
    }
    getProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="loading-animation-container">
        <Mosaic color="#195cce" size="large" text="" textColor="" />
      </div>
    );
  }

  const productInCart =
    cartItems && cartItems.find((item) => item.id === product.id);
  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";

  return (
    product && (
      <div className="page">
        <div className="container">
          <div className="product-detail">
            <div className="product-detail-image">
              <img
                src={product.images[randomIndex(product.images.length)]}
                alt={product.title}
              />
            </div>
            <div className="product-detail-content">
              <h1 className="product-detail-name">{product.title}</h1>
              <p className="product-detail-price">${product.price}</p>
              <p className="product-detail-description">
                {product.description}
              </p>
              {/* <div className="product-detail-multiple-images">
                <img src={product.images[0]} />
                <img src={product.images[1]} />
                <img src={product.images[2]} />
              </div> */}
              <button
                className="btn btn-cta product-detail-add-to-cart-btn"
                onClick={() => addToCart(product.id)}
              >
                <i class="fa-solid fa-cart-arrow-down"></i>Add to Cart
                {productQuantityLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetail;
