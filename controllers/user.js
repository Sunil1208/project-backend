const User = require('../models/user');


exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user found in the Database"
            })
        }

        req.profile = user
        next();
    })
}

exports.getUser = (req, res) => {
    
    //TODO: get back here for password
    req.profile.salt = undefined;               //for not showing salt to the user
    req.profile.encry_password = undefined;     //for not showing encry_password to the user
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)
};

exports.updateUser = ( req, res) => {
    User.findByIdAndUpdate((
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "You are not authorized to update the info of this user."
                })
            }
            user.salt=undefined;
            user.encry_password = undefined;
            res.json(user)
        }
    ))
}
