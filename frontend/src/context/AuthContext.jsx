import { useState, createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { userLogIn, userSignUp } from "../services/authService"


const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const { getItem, setItem, removeItem } = useLocalStorage();
  const [user, setUser] = useState(getItem("currentUser") ? getItem("currentUser") : null)
  const [error, setError] = useState(null);
  
  useEffect(() => {
    console.log("user", user)
  }, [user])

  async function signUp(name, username, email, password) {
    try {
      const newUser = { name, username, email, password };
      const user = await userSignUp(newUser)
      console.log('user signed up', user)  
      return { success: true };
    } catch (error) {
      console.log({error, reason: "username already exists"})
      return { success: false, error: "username already exists", errorMessage: error}
    }
  }
  
  async function logIn(username, password) {
    try {
      const user = await userLogIn({ username, password })
      console.log('user logged in', user)
      if (!user) {
        return { success: false, error: "User does not exist" }
      } 
      
      setUser(user)
      setItem("currentUser", user)
      return { success: true }
    } catch (error) {
      console.log({error, reason: "invalid username or password"})
      return { successs: false, error: "Invalid username or password"}
    }
  }

  function logOut() {
    removeItem("currentUser");
    setUser(null)
  }

  function handleError(message) {
    message !== null ? setError(message) : setError(null)
  }

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut, error, handleError }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
