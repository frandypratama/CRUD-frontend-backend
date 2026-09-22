import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ProductForm from "../components/ProductForm";

import {
  getProductById,
  updateProduct,
} from "../services/productService";

export default function EditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);

        setProduct(data);
      } catch (error) {
        console.error(error);

        alert("Gagal mengambil data produk");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await updateProduct(id, {
        nama: data.nama,
        harga: data.harga,
        kategori: data.kategori,
      });

      alert("Produk berhasil diperbarui");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Gagal memperbarui produk");
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8">
        Produk tidak ditemukan
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-6xl">

        <h1 className="mb-6 text-3xl font-bold">
          Edit Produk
        </h1>

        <div className="rounded bg-white p-6 shadow">

          <ProductForm
            initialData={product}
            onSubmit={handleSubmit}
            buttonText="Update Produk"
          />

        </div>

      </div>

    </div>
  );
}