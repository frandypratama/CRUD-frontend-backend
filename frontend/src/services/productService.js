import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// GET SEMUA PRODUK
// SEARCH + KATEGORI

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

// GET KATEGORI

export const getCategories = async () => {
  const response = await api.get("/categories");

  return response.data;
};

// GET PRODUK BERDASARKAN ID

export const getProductById = async (id) => {
  const response = await api.get(
    `/products/${id}`
  );

  return response.data;
};


// CREATE PRODUK


export const createProduct = async (data) => {
  const response = await api.post(
    "/products",
    data
  );

  return response.data;
};

// UPDATE PRODUK

export const updateProduct = async (
  id,
  data
) => {
  const response = await api.put(
    `/products/${id}`,
    data
  );

  return response.data;
};

// DELETE PRODUK

export const deleteProduct = async (id) => {
  const response = await api.delete(
    `/products/${id}`
  );

  return response.data;
};

// TAMBAH STOK

export const addStock = async (
  id,
  jumlah
) => {
  const response = await api.patch(
    `/products/${id}/tambah-stok`,
    {
      jumlah,
    }
  );

  return response.data;
};

// KURANGI STOK

export const reduceStock = async (
  id,
  jumlah
) => {
  const response = await api.patch(
    `/products/${id}/kurangi-stok`,
    {
      jumlah,
    }
  );

  return response.data;
};