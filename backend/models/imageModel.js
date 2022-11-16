const mongoose = require('mongoose')

const imageSchema = mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    url: {
        type: String,
        required: [true, 'Please add a text value']
    },
    label: {
        type: String,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Image', imageSchema)