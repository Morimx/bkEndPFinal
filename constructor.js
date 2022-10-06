const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  save(objeto) {
    // const contenido = fs.readFileSync(this.archivo, "utf-8");
    // JSON.parse(contenido);
    // podemos llamar a getAll() para que nos traiga la info ya parseada y no repetir codigo
    const productos = this.getAll();
    const id = productos.length + 1;
    const timeStamp = Date.now();
    const producto = { id, timeStamp, ...objeto };
    productos.push(producto);
    fs.writeFileSync(this.archivo, JSON.stringify(productos, null, 2));
    return id;
  }

  saveCarrito() {
    // const contenido = fs.readFileSync(this.archivo, "utf-8");
    // JSON.parse(contenido);
    const carritosParseados = this.getAll();
    const id = carritosParseados.length + 1;
    // podes armar el objeto directamente de la siguiente manera
    const nuevoCarrito = { 
      id, 
      timeStamp: Date.now(),
      productos: []
    }
    carritosParseados.push(nuevoCarrito);
    fs.writeFileSync(this.archivo, JSON.stringify(carritosParseados, null, 2));
    return id;
  }

  getById(id) {
    // const data = fs.readFileSync(this.archivo, "utf-8");
    // JSON.parse(data);
    const dataParseada = this.getAll();
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
    // const data = fs.readFileSync(this.archivo, "utf-8");
    // JSON.parse(data);
    const dataParseada = this.getAll();
    const dataFiltrada = dataParseada.filter((objeto) => objeto.id !== id);
    if (dataParseada.length === dataFiltrada.length) {
      throw new Error("No se pudo encontrar el id: " + id)
    }
    const dataString = JSON.stringify(dataFiltrada);
    fs.writeFileSync(this.archivo, dataString);
    return `El producto con id: ${id} fue eliminado`;
  }

  deleteAll() {
    fs.writeFileSync(this.archivo, "[]");
    return "[]";
  }

  getRandom() {
    // const data = fs.readFileSync(this.archivo, "utf-8");
    // JSON.parse(data);
    const dataParseada = this.getAll();
    let random = dataParseada[Math.floor(Math.random() * dataParseada.length)];
    return random;
  }

  updateById(id, objetoNuevo) {
    // const data = fs.readFileSync(this.archivo, "utf-8");
    // JSON.parse(data);
    let dataParseada = this.getAll();
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
    // const contenido = fs.readFileSync(this.archivo, "utf-8");
    // JSON.parse(contenido);
    const dataParseada = this.getAll();
    const carrito = dataParseada.find((objeto) => objeto.id == id);
    if (carrito === undefined) {
      throw new Error("No se pudo encontrar el carrito: " + id);
    }
    carrito.productos.push(objetoAdd);
    fs.writeFileSync(this.archivo, JSON.stringify(dataParseada, null, 2));
    return mensaje;
  }

// No me funciono te dejo una idea mia
// deleteProduct(id, idProducto) {
//   console.log({id},{idProducto},"DELETEANDO")
//     const mensaje = "Se elimino el producto del carrito";
//     const contenido = fs.readFileSync(this.archivo, "utf-8");
//     const dataParseada = JSON.parse(contenido);
//     let carrito = dataParseada.find((objeto) => objeto.id == id);
//     if (carrito === undefined) {
//       throw new Error("No se pudo encontrar el carrito: " + id);
//     }
//     const productosFiltrados = carrito.productos.filter((objeto) => objeto.id != idProducto);
//     if (carrito.productos.length === productosFiltrados.length) {
//       throw new Error("No se pudo encontrar el producto: " + idProducto);
//     }
//     carrito.productos = productosFiltrados
//     console.log(this.getById(id))
//     fs.writeFileSync(this.archivo, JSON.stringify(dataParseada, null, 2));
//     return mensaje;
//   }
  deleteProductInCart(id, idProducto) {
    const mensaje = "Se elimino el producto del carrito";
    // const contenido = fs.readFileSync(this.archivo, "utf-8");
    //JSON.parse(contenido);
    const dataParseada = this.getAll();
    let carrito = dataParseada.find((objeto) => objeto.id == id);
    // buscamos el indice del carrito sobre el que queremos trabajar
    const index= dataParseada.findIndex(obj=> obj.id == id)
    if (carrito === undefined) {
      throw new Error("No se pudo encontrar el carrito: " + id);
    }
    const productosFiltrados = carrito.productos.filter((objeto) => objeto.id != idProducto);
    if (carrito.productos.length === productosFiltrados.length) {
      throw new Error("No se pudo encontrar el producto: " + idProducto);
    }
    // Entonces nos posocionamos en el carrito, en la posicion del indice que obtuvimos
    // y entramos en la propiedad productos, para asignarle el nuevo valor.
    dataParseada[index].productos = productosFiltrados
    fs.writeFileSync(this.archivo, JSON.stringify(dataParseada, null, 2));
    return mensaje;
  }
};

module.exports = Contenedor;
