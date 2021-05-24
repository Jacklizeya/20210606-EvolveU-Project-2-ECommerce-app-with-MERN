const mongoose = require ("mongoose")

const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
    user: {
        // who created this product, Which admin, reference User's ID
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {timestamps: true})
// This is like a configuration object




const productSchema = mongoose.Schema({
    user: {
        // who created this product, Which admin, reference User's ID
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
    }, 
    category: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    }, 
    reviews: [reviewSchema],
    // how to deal with array
    rating: {
        type: Number,
        required: true,
        default: 0
    }, 
    numReviews: {
        type: Number,
        required: true,
        default: 0
    }, 
    price: {
        type: Number,
        required: true,
        default: 0
    }, 
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema)

module.exports = Product