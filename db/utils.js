function formatProductForView(dbProducto) {
    return {
        id: dbProducto._id.toString(),
        brand: dbProducto.brand,
        model: dbProducto.model,
        price: dbProducto.price,
        category: dbProducto.category,
        images: dbProducto.images,
        features: dbProducto.features
    };
}