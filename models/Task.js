const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    task: {
        type: String
    },
    isCompleted: {
        type: Boolean
    },
    userId:{
        type: String
    }
}, { timestamps: true })

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;