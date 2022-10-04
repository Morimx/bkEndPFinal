const Usuarioreg = require("../../registrarusuario");
const usuario = new Usuarioreg("./data/usuarios.json");

const checkAdmin = async (req, res, next) => {
    try {
        if (usuario.get(req.headers).administrador) {
            next();
        } else {
            res.status(401).send("No autorizado");
        }
    } catch (err) {
        res.status(401).send("No autorizado");
    }
}

module.exports = { checkAdmin }