import { Link } from "react-router-dom";

export default function ProductTable({
  products,
  loading,
  onDelete,
  onAddStock,
  onReduceStock,
}) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (products.length === 0) {
    return <p>Belum ada produk.</p>;
  }

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="border p-2">No</th>
          <th className="border p-2">Nama</th>
          <th className="border p-2">Harga</th>
          <th className="border p-2">Stok</th>
          <th className="border p-2">Kategori</th>
          <th className="border p-2">Aksi</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product, index) => (
          <tr key={product.id}>
            <td className="border p-2, text-center">
              {index + 1}
            </td>

            <td className="border p-2">
              {product.nama}
            </td>

            <td className="border p-2">
              Rp{" "}
              {Number(product.harga).toLocaleString(
                "id-ID"
              )}
            </td>

            <td className="border p-2 text-center">
              <span className="font-semibold">
                {product.stok}
              </span>
            </td>

            <td className="border p-2">
              {product.kategori}
            </td>

            <td className="border p-2">
              <div className="flex justify-between">

                {/* EDIT */}
                <Link
                  to={`/products/edit/${product.id}`}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  Edit
                </Link>

                {/* DELETE */}
                <button
                  onClick={() =>
                    onDelete(product.id)
                  }
                  className="rounded bg-red-500 px-3 py-1 text-white"
                >
                  Delete
                </button>

                {/* TAMBAH STOK */}
                <button
                  onClick={() =>
                    onAddStock(product.id)
                  }
                  className="rounded bg-green-600 px-3 py-1 text-white"
                >
                  + Stok
                </button>

                {/* KURANGI STOK */}
                <button
                  onClick={() =>
                    onReduceStock(product.id)
                  }
                  className="rounded bg-orange-500 px-3 py-1 text-white"
                >
                  - Stok
                </button>

              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}