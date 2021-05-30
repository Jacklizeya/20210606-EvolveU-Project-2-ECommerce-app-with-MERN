const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")

const getProducts = asyncHandler (async (req, res, next) => {
  const pageSize = 4
  const page  = Number (req.query.pageNumber) || 1
   
  const keyword = req.query.keyword ? {name: {$regex: req.query.keyword, $options: "i"}} : {}
  const category = req.query.category? {category: req.query.category} : {}
  console.log("backend", page, keyword, category)
  const count = await Product.countDocuments({...keyword, ...category})
  const products = await Product.find({...keyword, ...category}).limit(pageSize).skip(pageSize * (page - 1))
  
    res.json({products, page, pages: Math.ceil(count/pageSize)});
    })

// @desc 
// @route  GET API/PRODUCTS
// @access Public
const getProductById = asyncHandler (async function (req, res, next){


    const product = await Product.findById({_id : req.params.id})
    if (product) {res.json(product)} else {
      res.status(404);
      throw new Error("product not found")
    };
    })

// @desc 
// @route  DELETE API/PRODUCT/:ID
// @access Private/admin
const deleteProduct = asyncHandler (async function (req, res, next){
  const product = await Product.findById({_id : req.params.id})
  if (product) {await product.remove();
    res.json({message: "product removed"})
  } else {
    res.status(404);
    throw new Error("product not found")
  };
  })

// @desc   Create product
// @route  POST API/PRODUCTS
// @access Private/admin
const createProduct = asyncHandler (async function (req, res, next){
  const product = await new Product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description"
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
  })

// @desc   Create product
// @route  PUT API/PRODUCTS/:ID
// @access Private/admin
const updateProduct = asyncHandler (async function (req, res, next){
  const {name, price, description, image, brand, category, countInStock} = req.body
  const product = await Product.findById(req.params.id)
  
 // the new information will come from post
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
   
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {res.status(404); throw new Error("product no found")}
  })


  //  create new review
  //  POST /api/products/:id/reviews
  const createProductReview = asyncHandler (async function (req, res, next){
    const {rating, comment} = req.body
    const product = await Product.findById(req.params.id)
    
   // the new information will come from post
    if (product) {
      const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString)
      if (alreadyReviewed) {res.status(400); throw new Error ("product already reviewed")}

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
      }

      product.reviews.push(review)
      product.numReviews = product.reviews.length
      product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
      await product.save()
      res.status(201).json({message: "review added"})
    } else {res.status(404); throw new Error("product no found")}
    })
  
  //  get top rated product
  //  get /api/products/top
  //  Public: get top products
  const getTopProducts = asyncHandler (async function (req, res, next){
    console.log(" I want to get top products")
    const products = await Product.find({}).sort({rating: -1}).limit(3)
    console.log(" That is the products I got", products)
    res.json(products)
    })

module.exports = {getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts}