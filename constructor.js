const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  save(objeto) {
    const contenido = fs.readFileSync(this.archivo, "utf-8");
    const productos = JSON.parse(contenido);
    const id = productos.length + 1;
    const timeStamp = Date.now();
    const producto = { id, timeStamp, ...objeto };
    productos.push(producto);
    fs.writeFileSync(this.archivo, JSON.stringify(productos, null, 2));
    return id;
  }

  saveCarrito() {
    const contenido = fs.readFileSync(this.archivo, "utf-8");
    const productosParseados = JSON.parse(contenido);
    const id = productosParseados.length + 1;
    const timeStamp = Date.now();
    const productos = [];
    const producto = { id, timeStamp, productos };
    productosParseados.push(producto);
    fs.writeFileSync(this.archivo, JSON.stringify(productosParseados, null, 2));
    return id;
  }

  getById(id) {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    const objeto = dataParseada.find((objeto) => objeto.id === id);
    if (objeto === undefined) {
      throw new Error("No se pudo encontrar el id: " + id)
    }
    return objeto;
  }

  getAll() {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    return dataParseada;
  }

  deleteById(id) {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    const dataFiltrada = dataParseada.filter((objeto) => objeto.id !== id);
    if (dataParseada.length === dataFiltrada.length) {
      throw new Error("No se pudo encontrar el id: " + id)
    }
    const dataString = JSON.stringify(dataFiltrada);
    fs.writeFileSync(this.archivo, dataString);
    return dataFiltrada;
  }

  deleteAll() {
    fs.writeFileSync(this.archivo, "[]");
    return "[]";
  }

  getRandom() {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    let random = dataParseada[Math.floor(Math.random() * dataParseada.length)];
    return random;
  }

  updateById(id, objetoNuevo) {
    const data = fs.readFileSync(this.archivo, "utf-8");
    let dataParseada = JSON.parse(data);
    let productoViejo = dataParseada.find((objeto) => objeto.id === id);
    let mensaje = "Se reemplazo el producto";
    if (productoViejo === undefined) {
      throw new Error("No se pudo encontrar el producto: " + id);
    }
    let productosFiltrados = dataParseada.filter((objeto) => objeto.id !== id);
    productoViejo = { id, ...objetoNuevo };
    productosFiltrados.push(productoViejo);
    fs.writeFileSync(this.archivo, JSON.stringify(productosFiltrados, null, 2));
    return mensaje;
  }

  saveInCarrito(id, objetoAdd) {
    const mensaje = "Se agrego el producto al carrito";
    const contenido = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(contenido);
    const carrito = dataParseada.find((objeto) => objeto.id == id);
    if (carrito === undefined) {
      throw new Error("No se pudo encontrar el carrito: " + id);
    }
    carrito.productos.push(objetoAdd);
    fs.writeFileSync(this.archivo, JSON.stringify(dataParseada, null, 2));
    return mensaje;
  }

  deleteProduct(id, idProducto) {
    const mensaje = "Se elimino el producto del carrito";
    const contenido = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(contenido);
    let carrito = dataParseada.find((objeto) => objeto.id == id);
    if (carrito === undefined) {
      throw new Error("No se pudo encontrar el carrito: " + id);
    }
    const productosFiltrados = carrito.productos.filter((objeto) => objeto.id != idProducto);
    if (carrito.productos.length === productosFiltrados.length) {
      throw new Error("No se pudo encontrar el producto: " + idProducto);
    }
    carrito.productos = productosFiltrados
    fs.writeFileSync(this.archivo, JSON.stringify(dataParseada, null, 2));
    return mensaje;
    /**
 no es necesario guardar en una variable para volver a asignar, recorda que estos datos se guardan por referencia.
 con aplicar el filter ya es suficiente.
 carrito.productos.filter((objeto) => objeto.id != idProducto);
 */
    /////////////////////////////RESPUESTA/////////////////////////////////
    //Filter no modifica el array  original por lo que hay que reasignarlo (lo probe y tambien lo busque en developer mozilla): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  }

};

module.exports = Contenedor;
