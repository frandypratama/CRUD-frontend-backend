import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addStock,
  reduceStock,
  getCategories,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getProducts);

router.get("/products/:id", getProductById);

router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

router.get("/categories", getCategories);

router.patch(
  "/products/:id/tambah-stok",
  addStock
);

router.patch(
  "/products/:id/kurangi-stok",
  reduceStock
);

export default router;