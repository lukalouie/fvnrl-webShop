import mongoose from "mongoose"

const reviewSchema = mongoose.Schema({
    name: {type: String, required:true},
    rating: {type: Number, required:true},
    comment: {type: String, required:true},    
}, {timestamps: true})

const productSchema = mongoose.Schema({
    typeID: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, //izvuci userID koji slaze product (admin mora bit, koji)
        required: true,
        ref: "User" //adds relationship between user and product
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],    
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    countAndSize: {
        xs: {
            type: Number,
            required: true,
            default: 0
        },
        s: {
            type: Number,
            required: true,
            default: 0
        },
        m: {
            type: Number,
            required: true,
            default: 0
        },
        l: {
            type: Number,
            required: true,
            default: 0
        },
        xl: {
            type: Number,
            required: true,
            default: 0
        }
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)

export default Product