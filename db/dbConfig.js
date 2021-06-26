require('dotenv').config();

const dbConfig = {
    url: process.env.URL,
    database: "ecommerceDB",
    coleccion: "productos"
};



module.exports = dbConfig;