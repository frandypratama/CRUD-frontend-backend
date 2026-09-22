import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductTable from "../components/ProductTable";

import {
  getProducts,
  deleteProduct,
  addStock,
  reduceStock,
  getCategories,
} from "../services/productService";

export default function Home() {
  // =========================
  // STATE
  // =========================

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search
  const [search, setSearch] = useState("");

  // Kategori yang dipilih
  const [kategori, setKategori] = useState("semua");

  // Daftar kategori dari database
  const [categories, setCategories] = useState([]);

  // =========================
  // GET PRODUCTS
  // =========================

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts(
        search,
        kategori
      );

      console.log("DATA PRODUK:", data);

      setProducts(data);
    } catch (error) {
      console.error(
        "GAGAL MEMUAT PRODUK:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Gagal memuat produk"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GET CATEGORIES
  // =========================

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      console.log("DATA KATEGORI:", data);

      setCategories(data);
    } catch (error) {
      console.error(
        "GAGAL MEMUAT KATEGORI:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Gagal memuat kategori"
      );
    }
  };

  // =========================
  // LOAD PRODUCTS
  // =========================

  useEffect(() => {
    loadProducts();
  }, [search, kategori]);

  // =========================
  // LOAD CATEGORIES
  // =========================

  useEffect(() => {
    loadCategories();
  }, []);

  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDelete = async (id) => {
    const yakin = window.confirm(
      "Apakah yakin ingin menghapus produk?"
    );

    if (!yakin) return;

    try {
      await deleteProduct(id);

      alert("Produk berhasil dihapus");

      // Refresh produk
      loadProducts();

      // Refresh kategori
      loadCategories();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Gagal menghapus produk"
      );
    }
  };

  // =========================
  // TAMBAH STOK
  // =========================

  const handleAddStock = async (id) => {
    const jumlah = window.prompt(
      "Masukkan jumlah stok yang ingin ditambahkan:"
    );

    // Jika user tekan Cancel
    if (jumlah === null) return;

    const angka = Number(jumlah);

    // Validasi
    if (!angka || angka <= 0) {
      alert(
        "Jumlah stok harus lebih dari 0"
      );

      return;
    }

    try {
      await addStock(id, angka);

      alert(
        "Stok berhasil ditambahkan"
      );

      loadProducts();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Gagal menambahkan stok"
      );
    }
  };

  // =========================
  // KURANGI STOK
  // =========================

  const handleReduceStock = async (id) => {
    const jumlah = window.prompt(
      "Masukkan jumlah stok yang ingin dikurangi:"
    );

    // Jika user tekan Cancel
    if (jumlah === null) return;

    const angka = Number(jumlah);

    // Validasi
    if (!angka || angka <= 0) {
      alert(
        "Jumlah stok harus lebih dari 0"
      );

      return;
    }

    try {
      await reduceStock(id, angka);

      alert(
        "Stok berhasil dikurangi"
      );

      loadProducts();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Gagal mengurangi stok"
      );
    }
  };

  // =========================
  // RETURN
  // =========================

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <h1 className="text-3xl font-bold">
            Daftar Produk
          </h1>

          <Link
            to="/products/create"
            className="rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
          >
            + Tambah Produk
          </Link>

        </div>

        {/* =========================
            SEARCH & FILTER
        ========================= */}

        <div className="mb-6 grid gap-4 rounded bg-white p-5 shadow md:grid-cols-2">

          {/* SEARCH */}

          <div>
            <label className="mb-2 block font-medium">
              Cari Produk
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Cari berdasarkan nama produk..."
              className="w-full rounded border p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* KATEGORI */}

          <div>
            <label className="mb-2 block font-medium">
              Filter Kategori
            </label>

            <select
              value={kategori}
              onChange={(e) =>
                setKategori(e.target.value)
              }
              className="w-full rounded border p-3 outline-none focus:border-blue-500"
            >
              {/* DEFAULT */}

              <option value="semua">
                Semua Kategori
              </option>

              {/* KATEGORI DARI DATABASE */}

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* =========================
            TABLE
        ========================= */}

        <div className="rounded bg-white p-6 shadow">

          <ProductTable
            products={products}
            loading={loading}
            onDelete={handleDelete}
            onAddStock={handleAddStock}
            onReduceStock={handleReduceStock}
          />

        </div>

      </div>
    </div>
  );
}