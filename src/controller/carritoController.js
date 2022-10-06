const Contenedor = require("../../constructor");
const constructor = new Contenedor("./data/carrito.json");
const productosDB = new Contenedor("./data/productos.json");

const createCarrito = async (req, res) => {
    try {
        //El objeto data no se esta recibiendo en el constructor
        // const data = {}; 
        // guardamos el id que devuelve el metodo saveCarrito
        const carritoId = constructor.saveCarrito();
        res.status(200).send("Carrito creado con el id: " + carritoId);
    } catch (err) {
        res.status(401).send(err.message);
    }
}

const deleteProdIdInCarritoID = async (req, res) => {
    try {
        const { id, idProducto } = req.params;
        constructor.deleteProductInCart(id, idProducto);
        res.send("Se elimino el producto con el id: " + idProducto);
    } catch (err) {
        res.status(401).send(err.message);
    }
}

const deleteCartById = async (req, res) => {
    try {
        const { id } = req.params;
        constructor.deleteById(parseInt(id));
        res.send("Se elimino el carrito con el id: " + id);
    } catch (err) {
        res.status(401).send(err.message);
    }
}

const getCarrito = async (req, res) => {
    try {
        const { id } = req.params;
        const data = constructor.getById(parseInt(id));
        res.send(data.productos);
    } catch (err) {
        res.status(401).send(err.message);
    }
}

const addProdToCart = async (req, res) => {
    try {
        const { id } = req.params;
        // podes desctrucurar el body
        const {idProducto} = req.body;
        const productoAgr = productosDB.getById(parseInt(idProducto));
        constructor.saveInCarrito(id, productoAgr);
        res.send("Se agrego el producto con el id: " + idProducto);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = { createCarrito, deleteProdIdInCarritoID, deleteCartById, getCarrito, addProdToCart }