const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const fs = require("fs");
const Contenedor = require("./constructor");
const constructor = new Contenedor("./data/productos.json");
const productosRouter = require("./src/routes/productos");
const RoutesAPI = require("./src/routes/RoutesAPI");
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

app.use("/signup", (req, res) => {
  res.render("signup", {
    layout: "signup"
  });
});

app.use("/login", (req, res) => {
  res.render("login", {
    layout: "login"
  });
});

/////////////////////////
// EXPRESS ROUTER ///////
/////////////////////////

app.use('/api', RoutesAPI);
app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);


/////////////////////////
// SERVER ON ////////////
/////////////////////////
app.listen(3000, () => {
  console.log("Server ON");
});
