const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
// const fs = require("fs"); No se utiliza en este archivo
const Contenedor = require("./constructor");
const constructor = new Contenedor("./data/productos.json");
const productosRouter = require("./src/routes/productos");
const carritoRouter = require("./src/routes/carrito");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));


/////////////////////////
// HANDLE BARS VIEWS/////
/////////////////////////
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    layoutsDir: __dirname + "/views",
    defaultLayout: "main",
  })
);

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("root", {
    layout: "root",
    title: "Página principal",
    Precio: "Precio",
    addProd: "Añadir Producto",
    compras: constructor.getAll().sort((a, b) => a.id - b.id),
    noProd: "No hay productos",
    partialsPath: __dirname + "/views/partials",
  });
});


/////////////////////////
// EXPRESS ROUTER ///////
/////////////////////////
app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);
/**
 Si queres hacer dinamico el login, podes crear un router para eso => app.use("/signin", authRoutes);
 y en authRoutes vas a tener las respectivas funciones (que traes desde el controller)
 Podes hacer => post("/signin", signin)
 En la funcion singin deberias buscar por email en el json de usuarios (creo que lo haces con tu metodo get() en usuarioController.js).
 si existe el usuario con ese email, validar que la password guardada coincida con la recibida (Ya depende de vos si qrs que diferencie entre letras mayusculas
 y minusculas). Si existe, y las pass coinciden, cambias el valor isLogged= true, sino el correspondiente error. 
 Dsp haces un middleware que valide si en el header isLogged=true.
 Con eso y el middleware que hiciste que verifica si es admin, queda listo.
 Despues vamos a ver como trabajar el login aplicando token.
 */

/////////////////////////
// SERVER ON ////////////
/////////////////////////
app.listen(3003, () => {
  console.log("Server ON");
});
