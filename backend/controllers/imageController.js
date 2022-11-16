const asyncHandler = require('express-async-handler')

const Image = require('../models/imageModel')
const User = require('../models/userModel')

// @desc Get Images
// @route GET /api/getImage
// @access Private
const getImage = asyncHandler(async (req, res) => {
    const todos = await Image.find({ user: req.user.id })
    
    res.status(200).json(todos)
})

// @desc Get Images
// @route GET /api/getImage
// @access Private
const getImageByLabel = asyncHandler(async (req, res) => {
    const todos = await Image.find({ user: req.user.id, label: req.params.label })
    
    res.status(200).json(todos)
})

// @desc Add Image
// @route POST /api/add
// @access Private
const addImage = asyncHandler(async (req, res) => {
    if(!req.body.url){
        res.status(400)
        throw new Error('Please add a url field')
    }

    const todo = await Image.create({
        url: req.body.url,
        label: req.body.label,
        user: req.user.id,
    })

    res.status(200).json(todo)
})

// @desc Delete Image
// @route DEL /api/deleteImage
// @access Private
const deleteImage = asyncHandler(async (req, res) => {
    const todo = await Image.findById(req.params.id)

    if (!todo){
        res.status(400)
        throw new Error('Image Not found')
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
    getImage,
    addImage,
    getImageByLabel,
    deleteImage,
}