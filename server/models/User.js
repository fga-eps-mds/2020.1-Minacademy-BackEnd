const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Email is invalid')
        }
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 6,
        validate(value) {
            if (value.includes('password'))
                throw new Error('Password must not contain "password"')
        }
    },
    userType: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        select: false
    },
    noAssociations: {
        type: [String],
        select: false
    },
});

UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    /**
     const hash = await bcrypt.hash(this.password, 10);
     this.password = hash;
     */
    next();
})

module.exports = mongoose.model('User', UserSchema);