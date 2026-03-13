import { useState } from "react";
import { createContext, useContext } from "react";
// import { getProductById } from "../data/fetchData";
import { getProductById } from "../services/productService"

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  console.log("cartItems", cartItems)
  function addToCart(productId) {
    const existing =
      cartItems.find((item) => item.id === productId);

    if (existing) {
      const currentQuantity = existing.quantity;
      const updatedCartItems = cartItems.map((item) =>
        item.id === productId
          ? { id: productId, quantity: currentQuantity + 1 }
          : item,
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems((prev) => [...prev, { id: productId, quantity: 1 }]);
    }
  }

  async function getCartItemsWithProducts() {
    const itemPromises = cartItems.map(async (item) => {
      const product = await getProductById(item.id)
      return product ? { ...item, product} : null
    })

    const results = await Promise.all(itemPromises)
    console.log("resulting product", results)

    return results.filter((item) => item&&item.product)
    // return cartItems
    //   .map((item) => ({
    //     ...item,
    //     product: getProductById(item.id),
    //   }))
    //   .filter((item) => item.product);
  }

  function removeFromCart(productId) {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    } else {
      // console.log(cartItems.find(item => item.id === productId).quantity)
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  }

  // async function getCartTotal() {
  //   const total = await cartItems.reduce(async (totalValue, item) => {
  //     const product = await getProductById(item.id);
  //     return totalValue + (product ? product.price * item.quantity : 0);
  //   }, 0);
  //   return total;
  // }

  async function getCartTotal() {
    let total = 0
    for (const item of cartItems) {
      const product = await getProductById(item.id)
      total = total + (product ? product.price * item.quantity : 0)
    }
    return total
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItems,
        getCartItemsWithProducts,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const context = useContext(CartContext);
  return context;
};

export { useCart }