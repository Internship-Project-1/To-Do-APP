const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    dob: {
        type: String
    },
    signInType: {
        type: String,
        default: 'email'
    }, //google, facebook, email
    imageURL: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/authentication-app-9d2cf.appspot.com/o/profile-images%2Favatar.png?alt=media&token=cb8ad60a-861d-4e55-bb63-f2ee17fe9abb'
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;