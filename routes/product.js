const express = require('express');
const router = express.Router();

const {getProductByID, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories} = require('../controllers/product')
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')


//All of the params
router.param('userId', getUserById);
router.param('productId', getProductByID)


//All of the actual routes
//create route
router.post('/product/create/:userId', isSignedIn, isAuthenticated, isAdmin , createProduct)

//read routes

//grabbing a single product
router.get('/product/:productId', getProduct)
router.get('/product/photo/:productId', photo)


//delete route
router.delete('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, deleteProduct)

//update route
router.put('/product/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, updateProduct)


//listing route
router.get('/products', getAllProducts)

//getting all categories
router.get('/products/categories', getAllUniqueCategories)

module.exports = router;