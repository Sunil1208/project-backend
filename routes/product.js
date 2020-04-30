const express = require('express');
const router = express.Router();

const {getProductByID} = require('../controllers/product')
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')


//All of the params
router.param('userId', getUserById);
router.param('productId', getProductByID)


//All of the actual routes


module.exports = router;