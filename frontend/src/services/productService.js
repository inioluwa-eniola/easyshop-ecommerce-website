import axios from "axios";

const getAllProducts = async () => {
  const request = await axios.get("/api/products")
  return request.data
}

const getProductById = async (id) =>  {
  const request = await axios.get(`/api/products/${id}`)
  console.log("post request", request)
  return request.data
}

export { getAllProducts, getProductById }