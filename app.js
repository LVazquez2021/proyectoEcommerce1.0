const express = require('express');
const exhbs = require('express-handlebars');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const conexion = require('./db/connect');
const session = require('express-session');



/**helper para configurar parcials */
const hbs = require('handlebars');
hbs.registerPartial(path.join(__dirname, 'views', 'partials'), function() {});

/**Helpers */
const NumeralHelper = require("handlebars.numeral");
const { ObjectID, ObjectId } = require('mongodb');
NumeralHelper.registerHelpers(hbs);

/**Motor de plantilla config */
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

//**config sesiones*/
app.use(session({
    secret: ["123abcdef456"],
    cookie: { secure: false }
}));

/**Routes*/

app.get('/', function(req, res) {
    res.redirect('/buscar')
})

app.get('/buscar', (req, res) => {
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
            });
        }
    );
})

app.get('/detalleProd', function(req, res) {
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
            if (req.session.carrito) {
                producto.disabled = req.session.carrito.some((product) => ObjectId(product.id).toString() === ObjectId(producto._id).toString())
            } else {
                producto.disabled = false;
            }
            // Renderiza la vista "producto" dentro del main-layout con los datos que le pasamos
            res.render("detalle-prod", {
                producto, // producto: producto 
            });
        }
    );
});



app.post("/cart", function(req, res) {
    const producto = req.body;
    if (producto) {
        if (!req.session.carrito) {
            req.session.carrito = [];
        }
        req.session.carrito.push(producto);
        res.status(200).send();
    } else {
        res.status(500).send();
        console.log('errores');
    }
    //  console.log(req.session.carrito);

});


app.post('/remove-item', function(req, res) {
    const { id } = req.body;
    req.session.carrito = req.session.carrito.filter((prod) => prod.id !== id);
    return res.json({ success: true })
})



app.get("/cart", function(req, res) {

    res.render('carrito', {
        titulo: "MI CARRITO",
        encodedJson: encodeURIComponent(JSON.stringify(req.session.carrito)),
        cart: req.session.carrito

    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});