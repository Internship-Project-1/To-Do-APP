const asyncHandler = require('express-async-handler')

// @desc Get Todos
// @route GET /api/getTodo
// @access Private
const getTodo = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get ToDo'})
})

// @desc Add Todo
// @route POST /api/addTodo
// @access Private
const addTodo = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({message: 'Add ToDo'})
})

// @desc Update Todo
// @route PUT /api/updateTodo
// @access Private
const updateTodo = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update ToDo ${req.params.id}`})
})

// @desc Delete Todo
// @route DEL /api/deleteTodo
// @access Private
const deleteTodo = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete ToDo ${req.params.id}`})
})

module.exports = {
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
}