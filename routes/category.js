const express = require('express')
const router = express.Router()

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory} = require('../controllers/category')
const {isSignedIn,isAuthenticated, isAdmin} = require('../controllers/auth')
const {getUserById,} = require('../controllers/user')

//params
router.param('userId', getUserById)
router.param('categoryId', getCategoryById)


//Actual routers goes here

//Create routes
router.post('/category/create/:userId', isSignedIn, isAuthenticated, isAdmin, createCategory)

//read 
router.get('/category/:categoryId', getCategory)
router.get('/categories', getAllCategory)

//update
router.put('/category/:categoryId/:userId',isSignedIn, isAuthenticated, isAdmin, updateCategory)

//delete


module.exports = router;