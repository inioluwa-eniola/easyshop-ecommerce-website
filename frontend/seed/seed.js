import axios from "axios";
import data from "./data";

const getData = async () => {
  const request = await axios.get("/api/products");
  return request.data;
};

const postData = async () => {
  const requests = data.map((item) =>
    axios.post("/api/products", {
      title: item.title,
      price: item.price,
      description: item.description,
      images: item.images,
      category: item.category.name
    }),
  );
  return await Promise.all(requests);
};

const deleteData = async () => {
  const request = await axios.delete("/api/products")
  return request.data
}

export { getData, postData, deleteData };
