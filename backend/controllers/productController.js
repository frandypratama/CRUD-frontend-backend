import Product from "../models/Product.js"
import { Op } from "sequelize";

//Get semua produk
export const getProducts = async (req, res) => {
  try {
    const { 
      search, 
      kategori,
      hargaM
    } = req.query;

    const where = {};

    //filter nama
    if (search && search.trim() !== "") {
      where.nama = {
        [Op.like]: `%${search}%`,
      };
    }

    //filter kategori
    if (
      kategori &&
      kategori.trim() !== "" &&
      kategori !== "semua"
    ) {
      where.kategori = kategori.trim();
    }

    const products = await Product.findAll({
      where,
      order: [["id", "DESC"]],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("ERROR GET PRODUCTS", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

//GET Product berdasarkan ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE Product
export const createProduct = async (req, res) => {
  try {
    const { nama, harga, stok, kategori } = req.body;

    if (!nama || harga === undefined || stok === undefined || !kategori) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    if (harga < 0) {
      return res.status(400).json({
        message: "Harga tidak boleh negatif",
      });
    }

    if (stok < 0) {
      return res.status(400).json({
        message: "Stok tidak boleh negatif",
      });
    }

    const product = await Product.create({
      nama,
      harga,
      stok,
      kategori,
    });

    res.status(201).json({
      message: "Produk berhasil dibuat",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//UPDATE Product
export const updateProduct = async (req, res) => {
  try {
    const { nama, harga, kategori } = req.body;

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    if(!nama || !kategori) {
      return res.status(400).json({
        message: "Nama dan kategori wajib diisi",
      });
    }

    if (harga !== undefined && harga < 0) {
      return res.status(400).json({
        message: "Harga tidak boleh negatif",
      });
    }

    await product.update({
      nama,
      harga,
      kategori,
    });

    res.json({
      message: "Produk berhasil diperbarui",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Tambah Stok
export const addStock = async (req, res) => {
  try {
    const { jumlah } = req.body;

    if (!jumlah || jumlah <= 0) {
      return res.status(400).json({
        message: "Jumlah stok harus lebih dari 0",
      });
    }

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    const stokLama = product.stok;

    product.stok = stokLama + jumlah;

    await product.save();

    res.json({
      message: "Stok berhasil ditambahkan",
      stokLama,
      jumlahDitambahkan: jumlah,
      stokSekarang: product.stok,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Kuranngi Stok
export const reduceStock = async (req, res) => {
  try {
    const { jumlah } = req.body;

    if (!jumlah || jumlah <= 0) {
      return res.status(400).json({
        message: "Jumlah stok harus lebih dari 0",
      });
    }

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    if (product.stok < jumlah) {
      return res.status(400).json({
        message: "Stok tidak mencukupi",
      });
    }

    const stokLama = product.stok;

    product.stok = stokLama - jumlah;

    await product.save();

    res.json({
      message: "Stok berhasil dikurangi",
      stokLama,
      jumlahDikurangi: jumlah,
      stokSekarang: product.stok,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//DELETE Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    await product.destroy();

    res.json({
      message: "Produk berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Controller Kategori
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.findAll({
      attributes: ["kategori"],
      group: ["kategori"],
      order: [["kategori", "ASC"]],
    });

    const result = categories.map(
      (product) => product.kategori
    );

    res.status(200).json(result);
  } catch (error) {
    console.error(
      "ERROR GET CATEGORIES:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};
