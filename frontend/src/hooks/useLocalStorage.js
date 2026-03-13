export function useLocalStorage() {
  function setItem(key, value) {
    try {
      const loggedInUser = window.localStorage.setItem(key, JSON.stringify(value))
      return loggedInUser
    } catch (error) {
      console.log(`Error setting ${key} to localStorage`, error)
      return null
    }
  }
  
  function getItem(key) {
    try {
      const rawLoggedInUser = window.localStorage.getItem(key)
      return rawLoggedInUser === null ? null : JSON.parse(rawLoggedInUser)
    } catch(error) {
      console.log(`Error getting ${key} from localStorage`, error)
      return null
    }
  }
  
  function removeItem(key) {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.log(`Error removing ${key} from localStorage`, error)
      return null
    }
  }
  
  return { setItem, getItem, removeItem }
}

