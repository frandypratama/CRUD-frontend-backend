import { useNavigate } from "react-router-dom";

import ProductForm from "../components/ProductForm";

import {
  createProduct,
} from "../services/productService";

export default function CreateProduct() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createProduct(data);

      alert("Produk berhasil dibuat");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Gagal membuat produk");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-6xl">

        <h1 className="mb-6 text-3xl font-bold">
          Tambah Produk
        </h1>

        <div className="rounded bg-white p-6 shadow">

          <ProductForm
            onSubmit={handleSubmit}
            buttonText="Simpan Produk"
          />

        </div>

      </div>

    </div>
  );
}