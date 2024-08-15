const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require("joi");
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: '7d' });
    return token;
};

const User = mongoose.model('User', userSchema);

const validate = (data) => {
    const schema = joi.object({
        username: joi.string().required().label("Username"),
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password"),
        confirmPassword: joi.string().required().label("Confirm Password")
    });
    return schema.validate(data);
};

module.exports = { User, validate };
