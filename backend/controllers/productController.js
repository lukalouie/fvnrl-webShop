import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"

// desc: fetch products
// route: api/products
// access: public

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})

// desc: fetch product
// route: api/products/id
// access: public

const getProductById = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})

// desc: delete product
// route: DELETE api/products/id
// access: private/admin

const deleteProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    if (product) {
        await product.remove()
        res.json({message: "Product removed"})
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})

// desc: create product
// route: POST api/products
// access: private/admin

const createProduct = asyncHandler( async (req, res) => {
    const product = new Product({
        name: "Sample Name",
        price: 0,
        user: req.user._id,
        image: "/frontend/public/images/nosigi.png",
        typeID: "Sample TypeID",
        category: "Sample Category",
        countAndSize: {
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0
        },
        description: "Sample Description",
        numReviews: 0,
        rating: 0

    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// desc: update product
// route: PUT api/products/:id
// access: private/admin

const updateProduct = asyncHandler( async (req, res) => {
    
    const {name, price, image, description, typeID, category, countAndSize: {xs, s, m, l, xl} } = req.body
    
    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name,
        product.price = price,
        product.image = image,
        product.description = description,
        product.typeID = typeID,
        product.category = category,
        product.countAndSize.xs = xs,
        product.countAndSize.s = s,
        product.countAndSize.m = m,
        product.countAndSize.l = l,
        product.countAndSize.xl = xl


        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error("Product not found")
    }

    
})

/*// desc: update product on inc
// route: PUT /api/products/typeid
// access: private

const updateDec = asyncHandler(async (req, res) => {
    const typeID = req.params.typeid
    const products = await Product.find({typeID: { typeID }}).toArray()
    
    products.forEach(ele => {
        switch(req.size) {
            case("XS"):
                ele.countAndSize.xs -= 1
                console.log(ele.countAndSize.xs)
            case("S"):
                ele.countAndSize.s -= 1
            case("M"):
                ele.countAndSize.m -= 1
            case("L"):
                ele.countAndSize.l -= 1
            case("XL"):
                ele.countAndSize.xl -= 1
            default:
                return
        }
    });

      
})*/

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
    //updateDec
}