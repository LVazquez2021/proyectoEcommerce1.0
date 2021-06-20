const mongodb = require('mongodb').MongoClient;
const json = require('./itemsForDB.json');
const { url, database, coleccion } = require('./dbConfig');

function insertProdcts() {
    mongodb.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) { `Hubo un error en la conexion ${err}` }
        const data = db.db(database);
        const colectionProds = data.collection(coleccion).insertMany(json.products, function(err, res) {
            if (err) throw err;
            console.log("numero de documentos insertados:" + res.insertedCount);
            db.close();
        });
        console.log('database created!');
    });
}
insertProdcts();