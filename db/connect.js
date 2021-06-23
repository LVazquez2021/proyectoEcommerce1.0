const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const { url, database, coleccion } = require('./dbConfig');

function porCategoria(category, cbErr, cbListaProductos) {

    mongoClient.connect(url, function(err, db) {
        if (err) {
            console.log("Hubo un error conectando con el servidor:", err);

            cbErr(err);
            return;
        }


        const data = db.db(database);
        const colectionProds = data.collection(coleccion);


        colectionProds.find({ category: RegExp(category, 'gi') }).toArray(function(err, datos) {


            if (err) {
                console.log("Hubo un error convirtiendo la consulta a Array:", err);
                cbErr(err);
                return;
            }

            db.close();


            cbListaProductos(datos);
        });
    });

};

function porId(id, cbErr, cbProducto) {

    mongoClient.connect(url, function(err, db) {
        if (err) {
            console.log("Hubo un error conectando con el servidor:", err);

            cbErr(err);
            return;
        }


        const data = db.db(database);
        const colectionProds = data.collection(coleccion);


        colectionProds.findOne({ _id: mongodb.ObjectId(id) }, function(err, datos) {

            if (err) {
                console.log("Hubo un error al consultar:", err);
                cbErr(err);
                return;
            }

            db.close();

            cbProducto(datos);
        });
    });
}




module.exports = {
    porCategoria: porCategoria,
    porId: porId
}