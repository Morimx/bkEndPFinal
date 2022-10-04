const express = require("express");
const { Router } = express;
const router = Router();
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require("../controller/productosController");
const { checkAdmin } = require("../controller/usuarioController");

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", checkAdmin, addProduct);

router.put("/:id", checkAdmin, updateProduct);

router.delete("/:id", checkAdmin, deleteProduct);

module.exports = router;
