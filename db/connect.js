const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const { url, database, coleccion } = require('./dbConfig');

function porCategoria(category, cbErr, cbListaProductos) {
    // Conexión. Función asincrónica. Recibe por callback error o cliente.
    mongoClient.connect(url, function(err, db) {
        if (err) {
            console.log("Hubo un error conectando con el servidor:", err);
            // Si hay error lo retorno al callback de error y termino la función.
            cbErr(err);
            return;
        }

        // Conecto base de datos y colección
        const data = db.db(database);
        const colectionProds = data.collection(coleccion);

        // Consulto todos los documentos y los paso a Array (función asincrónica)
        colectionProds.find({ category: RegExp(category, 'gi') }).toArray(function(err, datos) {
            // Ya tengo los datos, cierro la conexión.

            if (err) {
                console.log("Hubo un error convirtiendo la consulta a Array:", err);
                cbErr(err);
                return;
            }

            db.close();

            // Si llegué acá no hubo errores, los retorno al callback de datos
            cbListaProductos(datos);
        });
    });

};

function porId(id, cbErr, cbProducto) {
    // Conexión. Función asincrónica. Recibe por callback error o cliente.
    mongoClient.connect(url, function(err, db) {
        if (err) {
            console.log("Hubo un error conectando con el servidor:", err);
            // Si hay error lo retorno al callback de error y termino la función.
            cbErr(err);
            return;
        }

        // Conecto base de datos y colección
        const data = db.db(database);
        const colectionProds = data.collection(coleccion);

        // Consulto los documentos que coincidan con el parametro pasado, si hay varios me devuelve el primero con el q encuentre coincidencias
        colectionProds.findOne({ _id: mongodb.ObjectId(id) }, function(err, datos) {
            // Ya tengo el dato, cierro la conexión.

            if (err) {
                console.log("Hubo un error al consultar:", err);
                cbErr(err);
                return;
            }

            db.close();
            //console.log(datos);

            // Si llegué acá no hubo errores, los retorno al callback de datos
            cbProducto(datos);
        });
    });
}




module.exports = {
    porCategoria: porCategoria,
    porId: porId
}