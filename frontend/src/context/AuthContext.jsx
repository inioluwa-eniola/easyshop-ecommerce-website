import { useState, createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { userLogIn, userSignUp } from "../services/authService"


const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const { setItem, removeItem } = useLocalStorage();
  const [user, setUser] = useState(null)


    useEffect(() => {
      console.log("user", user)
    }, [user])


  async function signUp(name, email, password) {
    const newUser = { name, email, password };
    const user = await userSignUp(newUser)
    console.log('user signed up', user)
    setItem("newUser", user)
    // setUser({ email });
    
    return { success: true };
  }
  
  async function login(email, password) {
    const user = await userLogIn({ email, password })
    console.log('user logged in', user)
    if (!user) {
      return { success: false }
    } 
    setUser(user)
    return { success: true }
  }

  function logout() {
    removeItem("currentUserEmail");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
