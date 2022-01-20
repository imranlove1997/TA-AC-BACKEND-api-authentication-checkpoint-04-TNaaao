var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

var userSchema = new Schema ({
    name: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,
    image: String,
    bio: String
})

userSchema.pre('save', async function(next) {
    if(this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.verifyPassword = async function(password) {
    try {
        var result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        return error;
    }
    bcrypt.compare();
}

userSchema.methods.tokenSign = async function() {
    var payload = { userId: this.user, email: this.email };
    try {
        var token = jwt.sign(payload, process.env.SECRET);
        return token;
    } catch (error) {
        return error;
    }
}

userSchema.methods.tokenValidate = async function() {
    return {
        name: this.name,
        username: this.username,
        email: this.email,
        token: token
    }
}

module.exports = mongoose.model('User', userSchema);