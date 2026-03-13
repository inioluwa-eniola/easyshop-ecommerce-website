import React from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from "../data/fetchData";

const Home = () => {
  const products = getProducts()

  return (
    <div className="page">
      <div className="container">
        <h2 className="page-title">Our Products</h2>
        <div className="product-grid">
          {products.map((product) => 
            <ProductCard product={product} key={product.id}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
