const asyncHandler = require('express-async-handler')
let multer = require('multer')
let upload = multer().single('file')
let fs = require('fs')
let path = require('path')

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

const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
};

// @desc Add Image
// @route POST /api/add
// @access Private
const addImage = asyncHandler(async (req,  res) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                res.status(400)
                throw new Error('Multer error')
            } else if (err) {
                // An unknown error occurred when uploading.
                res.status(400)
                throw new Error('Unknown error')
            }
            // Everything went fine.
            if(!req.file){
                res.status(400)
                throw new Error('Please add a file')
            }

            

            if((req.file.mimetype || "").startsWith("image")){
                let path = (req.user._id || "User_") + new Date().getTime().toString()
                fs.writeFileSync("backend/uploads/" + path, req.file.buffer)
                const image = new Image({
                    // label: req.body.label,
                    user: req.user.id,
                    url: "/static/uploads/" + path,
                })
                await image.save()
                res.status(200).json(image)
            }else{
                res
                    .status(403)
                    .contentType("text/plain")
                    .end("Only images files are allowed!");
            }
        })
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
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

const deleteALLImage = asyncHandler(async (req, res) => {

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    await Image.deleteMany({user: req.user.id})

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getImage,
    addImage,
    getImageByLabel,
    deleteImage,
    deleteALLImage
}