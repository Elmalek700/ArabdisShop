const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// اتصال ب MongoDB
mongoose.connect("mongodb+srv://Ahmed:Ahmed3mk@ahmed.imrxblk.mongodb.net/?retryWrites=true&w=majority&appName=Ahmed")
  .then(() => console.log("✅ متصل بقاعدة البيانات"))
  .catch(err => console.error("❌ خطأ بقاعدة البيانات:", err));

// موديل المنتج
const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  seller: String
});
const Product = mongoose.model("Product", productSchema);

// إعدادات
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// API جلب المنتجات
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// API إضافة منتج
app.post("/add", async (req, res) => {
  const { name, image, seller } = req.body;
  const newProduct = new Product({ name, image, seller });
  await newProduct.save();
  res.json({ success: true });
});

// تشغيل السيرفر
app.listen(PORT, () => console.log(`🚀 شغال على http://localhost:${PORT}`));
