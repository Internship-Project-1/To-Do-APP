const asyncHandler = require('express-async-handler')

const Todo = require('../models/todoModel')

// @desc Get Todos
// @route GET /api/getTodo
// @access Private
const getTodo = asyncHandler(async (req, res) => {
    const todos = await Todo.find()
    
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
        text: req.body.text
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

    await todo.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
}