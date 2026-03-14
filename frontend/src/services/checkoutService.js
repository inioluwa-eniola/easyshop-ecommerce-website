import axios from "axios"

let token = null 

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get("/api/users")
  return request.data
}

const checkout = async ({ username, password }) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.post("/auth/checkout", { username, password }, config)
  return request.data
}


export { setToken, getAll, checkout }
