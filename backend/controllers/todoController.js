const asyncHandler = require('express-async-handler')

const Todo = require('../models/todoModel')
const User = require('../models/userModel')

// @desc Get Todos
// @route GET /api/getTodo
// @access Private
const getTodo = asyncHandler(async (req, res) => {
    const todos = await Todo.find({ user: req.user.id })
    
    res.status(200).json(todos)
})

// @desc Add Todo
// @route POST /api/addTodo
// @access Private
const addTodo = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const todo = await Todo.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(todo)
})

// @desc Update Todo
// @route PUT /api/updateTodo
// @access Private
const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo){
        res.status(400)
        throw new Error('Todo Not Found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the todo user
    if (todo.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedTodo)
})

// @desc Delete Todo
// @route DEL /api/deleteTodo
// @access Private
const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo){
        res.status(400)
        throw new Error('Todo Not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the todo user
    if (todo.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await todo.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
}