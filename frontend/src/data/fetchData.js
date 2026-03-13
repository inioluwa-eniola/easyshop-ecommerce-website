import data from "./data";

const getProducts = () => {
  return data
}

const getProductById = (id) => {
  const product = data.find((product) => product.id === Number(id))
  return product
}

export { getProducts, getProductById } 