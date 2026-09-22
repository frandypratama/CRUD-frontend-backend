import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

export const getProducts = async (
  search = "",
  kategori = "semua"
) => {
  const response = await api.get("/products", {
    params: {
      search,
      kategori,
    },
  });

  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/categories");

  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};

export const createProduct = async (data) => {
  const response = await api.post("/products", data);

  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await api.put(`/products/${id}`, data);

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};

export const addStock = async (id, jumlah) => {
  const response = await api.patch(
    `/products/${id}/tambah-stok`,
    { jumlah }
  );

  return response.data;
};

export const reduceStock = async (id, jumlah) => {
  const response = await api.patch(
    `/products/${id}/kurangi-stok`,
    { jumlah }
  );

  return response.data;
};