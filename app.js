const express = require('express');
const exhbs = require('express-handlebars');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const utils = require('./db/utils');
const conexion = require('./db/connect');


/**Motor de plantilla config */
const hbs = require('handlebars');
hbs.registerPartial(path.join(__dirname, 'views', 'partials'), function() {});
/**Helpers */
const NumeralHelper = require("handlebars.numeral");
NumeralHelper.registerHelpers(hbs);


app.engine('hbs', exhbs({
    defaultLayout: "main",
    layoutsDir: "views/layouts",
    partialsDir: "views/partials",
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + "/views")

/**Recursos Estaticos */
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/**Routes*/

app.get('/', function(req, res) {
    res.redirect('/buscar')
})

app.get('/buscar', (req, res) => {
    let textoTitulo = "Bienvenidx a nuestro sitio de productos";
    conexion.porCategoria(
        req.query.valor,
        (err) => {
            console.log(err);
            res.render("error", {
                mensajeError: err,
            });
        },
        (listaProductosConsulta) => {
            textoTitulo = "Búsqueda de productos";
            // Renderizo la vista "grilla" con esos datos
            res.render("grilla", {
                productos: listaProductosConsulta,
                titulo: textoTitulo,
            });
        }
    );
})

app.get('/detalleProd', function(req, res) {
    console.log(req.query.id);
    const id = req.query.id;

    conexion.porId(
        id,

        (err) => {
            console.log(err);
            res.render("error", {
                err,
            });
        },
        (producto) => {
            // Renderiza la vista "producto" dentro del main-layout con los datos que le pasamos
            res.render("detalle-prod", {
                producto, // producto: producto 
            });
        }
    );

});

app.post("/cart", function(req, res) {


});



app.get("/cart", function(req, res) {
    let titulo;


    res.render('carrito', {
        titulo: "MI CARRITO"
    });

});




app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});