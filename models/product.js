const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema; //Use to refer to the schema that we want

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0      //whenever we are adding a producdt, intially we are not selling anything
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);