const Product = require('../models/product')

exports.getProductByID = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error: `${product} not found`
            })
        }
        req.product = product;
        next();
    })
}