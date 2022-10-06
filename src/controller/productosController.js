const Contenedor = require("../../constructor");
const constructor = new Contenedor("./data/productos.json");
const Usuarioreg = require("../../registrarusuario");
const usuario = new Usuarioreg("./data/usuarios.json");

const getProducts = async (req, res) => {
  try {
    // al hacer el res.send es recomendable no responder con una invocacion de fn
    // y almacenar antes la info
    const allProducts = constructor.getAll();
    res.send(allProducts);
  } catch (err) {
    res.status(404).send("No hay productos");
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productFound = constructor.getById(parseInt(id));
    res.send(productFound);
  } catch (err) {
    res.status(404).send("Producto no encontrado");
  }
};

const addProduct = async (req, res) => {
  try {
    const data = req.body;
    // faltaba capturar el id que response el metodo save()
    const productId = constructor.save(data);
    res.status(200).send(`Producto agregado con id: ${productId}`);
  } catch (err) {
    res.status(404).send("No se pudo agregar el producto");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const prodNuevo = req.body;
    const idInt = parseInt(id);
    // podrias optimizar el metodo updateById para que actualice solo propiedades que recibe,
    // ya que si solo quire actualizar la descripcion, pierdo el resto de la info. O estoy obligado
    // a enviar el objeto completo con la info actual y la modificacion que quiera hacer.
    /**
         es decir, si el prodcuto es por ej: 
            {
               "id": 3,
               "timeStamp": 1664055140610,
               "title": "Transportador",
               "descripcion": "Es una escuadra que mas va a ser",
               "codigo": "98",
               "foto": "http://asdad",
               "stock": 10
            }
            Como esta ahora, si quiero actualizar solo codigo, tengo que enviar:
                {
                  "timeStamp": 1664055140610,
                  "title": "Transportador",
                  "descripcion": "Es una escuadra que mas va a ser",
                  "codigo": "1552",
                  "foto": "http://asdad",
                  "stock": 10
                }
                ya que si envio solo el codigo:
                {
                    "codigo": 1552
                }
                pierdo la info anterior, quedaria asi:
                {
                    "id": 3,
                    "codigo": "1552",
                }
                */
/*
    Para esto podes enviar al metodo updateById() en vez de el prodNuevo, 
    la info destructurada, es decir:
    const {title, description, codigo, foto, stock}= req.body
    entonces (una solucion que te puede servir es usar operador ternario, que es como un if de una linea) 
    primero, usas el idInt para buscar el indice de ese producto, es decir su posicion dentro del arreglo de productos.
    podes usar el metodo findIndex-> const index= dataParseada.findIndex(prod=> prod.id == idInt) este metodo te devuelve el indice o un -1 si no encuentra.
    entonces, en tu dataParseada en la posicion index verificas decis que vas a guardar el resultado de una condicion.
    Por ej, 
    en dataParseada[index].title = 
    vamos a guardar el resultado de un condicional
    Entonces preguntamos si la propiedad tiene algo
    title ?
        asignamos esa propiedad
    title 
        sino, le dejamos la info que tiene
    : data[productoIndex].title ;
    seria algo asi=> dataParseada[index].title = title? title: data[productoIndex].title ;
    Asi con cada propiedad
*/
    res.send(constructor.updateById(idInt, prodNuevo));
  } catch (err) {
    res.status(404).send("No se pudo actualizar el producto");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    res.send(constructor.deleteById(parseInt(id)));
  } catch (err) {
    res.status(404).send("No se pudo eliminar el producto");
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
