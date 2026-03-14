import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
// import { getProducts } from "../data/fetchData";
import { getAllProducts } from "../services/productService"

const Home = () => {
  const [products, setProducts] = useState(null)
  useEffect(() => {
    async function getData(){
      const products = await getAllProducts()
      setProducts(products)
    }
    getData()
  }, [])

  return (
    <div className="page">
      <div className="container">
        <h2 className="page-title">Our Products</h2>
        <div className="product-grid">
          {products&&products.map((product) => 
            <ProductCard product={product} key={product.id}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
