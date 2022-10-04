const express = require("express");
const { Router } = express;
const router = Router();
const { createCarrito, deleteProdIdInCarritoID, deleteCartById, getCarrito, addProdToCart } = require("../controller/carritoController");



router.post("/", createCarrito);
router.delete("/:id", deleteCartById);
router.get("/:id/productos", getCarrito);
router.post("/:id/productos", addProdToCart);
router.delete("/:id/productos/:idProducto", deleteProdIdInCarritoID);


module.exports = router;
