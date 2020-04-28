const mongoose = require('mongoose')
const crypto = require('crypto');
const uuidv1 = require('uuid/v1')

//First way calling the Schema method
//const Schema =mongoose.Schema()

//Second methods
var userSchema = new mongoose.Schema({
    name: {
        type: String, //name will be of the type String
        required: true, //Mandatory to provide name
        maxlength: 32, //Max Length of the name
        trim: true, //Trims the extra spaces that comes up
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true //For validating that the email is unique
    },
    userinfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, {
    timestamps: true    // Use for recording the time stamp i.e. when it is created
});


//Creating virtuals
userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password //making password a private variable
        this.salt = uuidv1() //populating the salt with uuid
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password
    })


userSchema.methods = {

    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto
                .createHmac('sha256', this.salt)
                .update('plainpassword')
                .digest('hex');
        } catch (err) {
            return "";
        }
    }
}


module.exports = mongoose.model("User", userSchema)