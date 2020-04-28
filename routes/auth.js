const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require('../controllers/auth')


router.post('/signup',[
    check("name", "Name should be at least 3 characters").isLength({min: 3}),
    check("email", "Email is required").isEmail(),
    check("password","password should be at least 6 characters").isLength({min:6})

    ], signup
);



router.post('/signin',
[
    check("email", "Email is required").isEmail(),
    check("password","password field is required").isLength({min:6})
    ],
    signin
);

router.get('/signout',  signout)

// router.get('/testroute', isSignedIn, (req, res) => {
//     res.json(req.auth)
// })

module.exports = router;