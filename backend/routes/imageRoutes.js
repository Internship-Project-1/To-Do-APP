const express = require('express')
const router = express.Router()
const {getImage, getImageByLabel,addImage, deleteImage} = require('../controllers/imageController') 

const { protect } = require('../middleware/authMiddleware')

router.post('/add', protect, addImage)
router.get('/', protect, getImage)
router.get('/:label', protect, getImageByLabel)
router.delete('/:id', protect, deleteImage)

module.exports = router