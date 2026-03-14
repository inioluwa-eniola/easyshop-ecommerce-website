import axios from "axios";

const userSignUp = async ({ name, username, email, password }) => {
  const request = await axios.post("/api/users", { name, username, email, password })
  console.log("signup request.data", request.data)
  return request.data
}

const userLogIn = async ({ username, password }) => {
  const request = await axios.post("/api/login", { username, password })
  console.log("login request.data", request.data)
  return request.data
}

export { userLogIn, userSignUp }