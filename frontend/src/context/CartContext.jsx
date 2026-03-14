import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom"
import { createContext, useContext } from "react";
import { getProductById } from "../services/productService";
import checkoutService from "../services/checkoutService";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const { getItem } = useLocalStorage()

  const navigate = useNavigate()
  
  useEffect(() => {
    const loggedInUser = getItem("currentUser")
    if (loggedInUser) {
      checkoutService.setToken(loggedInUser.token)
      console.log("user token", loggedInUser.token)
    }
  }, [])  

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
  }

  function removeFromCart(productId) {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  }

  async function getCartTotal() {
    let total = 0
    for (const item of cartItems) {
      const product = await getProductById(item.id)
      total = total + (product ? product.price * item.quantity : 0)
    }
    return total
  }

  async function placeOrder() {
    const result = await checkoutService.checkout()
    console.log("result", result)
    if (result.success) {
      alert("successful order");
      setCartItems([]);
    } else {
      navigate("/login")
    }
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
        placeOrder, 
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