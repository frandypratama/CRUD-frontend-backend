import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sequelize from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(productRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database berhasil terhubung");

    await sequelize.sync();

    console.log("Database berhasil disinkronkan");

    app.listen(PORT, () => {
      console.log(
        `Server berjalan di http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();