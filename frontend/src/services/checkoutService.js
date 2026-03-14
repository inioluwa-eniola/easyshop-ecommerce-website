import axios from "axios"

let token = null 

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const checkout = async () => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const request = await axios.post("/auth/checkout",{}, config)
    return request.data
  } catch (error) {
    console.log(error)
    return ({ success: false, message: "user must login" })
  }
}

export default { setToken, checkout }
