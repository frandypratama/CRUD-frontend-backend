import { useState } from "react";

export default function ProductForm({
  initialData,
  onSubmit,
  buttonText,
}) {
  const [form, setForm] = useState({
    nama: initialData?.nama || "",
    harga: initialData?.harga || "",
    stok: initialData?.stok || "",
    kategori: initialData?.kategori || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nama.trim()) {
      alert("Nama produk wajib diisi");
      return;
    }

    if (form.harga === "") {
      alert("Harga wajib diisi");
      return;
    }

    if (Number(form.harga) < 0) {
      alert("Harga tidak boleh negatif");
      return;
    }

    if (form.stok === "") {
      alert("Stok wajib diisi");
      return;
    }

    if (Number(form.stok) < 0) {
      alert("Stok tidak boleh negatif");
      return;
    }

    if (!form.kategori.trim()) {
      alert("Kategori wajib diisi");
      return;
    }

    onSubmit({
      nama: form.nama,
      harga: Number(form.harga),
      stok: Number(form.stok),
      kategori: form.kategori,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-5"
    >

      <div>
        <label className="mb-1 block font-medium">
          Nama Produk
        </label>

        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          className="w-full rounded border p-2"
          placeholder="Contoh: Kopi Susu"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">
          Harga
        </label>

        <input
          type="number"
          name="harga"
          value={form.harga}
          onChange={handleChange}
          className="w-full rounded border p-2"
          placeholder="18000"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">
          Stok
        </label>

        <input
          type="number"
          name="stok"
          value={form.stok}
          onChange={handleChange}
          className="w-full rounded border p-2"
          placeholder="10"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">
          Kategori
        </label>

        <input
          type="text"
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          className="w-full rounded border p-2"
          placeholder="Minuman"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 px-5 py-2 text-white"
      >
        {buttonText}
      </button>

    </form>
  );
}