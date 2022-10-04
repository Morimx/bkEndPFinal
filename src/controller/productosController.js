const Contenedor = require("../../constructor");
const constructor = new Contenedor("./data/productos.json");
const Usuarioreg = require("../../registrarusuario");
const usuario = new Usuarioreg("./data/usuarios.json");

const getProducts = async (req, res) => {
    try {
        res.send(constructor.getAll());
    } catch (err) {
        res.status(404).send("No hay productos");
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        res.send(constructor.getById(parseInt(id)));
    } catch (err) {
        res.status(404).send("Producto no encontrado");
    }
}

const addProduct = async (req, res) => {
    try {
        const data = req.body;
        constructor.save(data);
        res.status(200).send("Producto agregado");
    } catch (err) {
        res.status(404).send("No se pudo agregar el producto");
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const prodNuevo = req.body;
        const idInt = parseInt(id);
        res.send(constructor.updateById(idInt, prodNuevo))
    } catch (err) {
        res.status(404).send("No se pudo actualizar el producto");
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        res.send(constructor.deleteById(parseInt(id)));
    } catch (err) {
        res.status(404).send("No se pudo eliminar el producto");
    }
}

module.exports = { getProducts, getProduct, addProduct, updateProduct, deleteProduct }