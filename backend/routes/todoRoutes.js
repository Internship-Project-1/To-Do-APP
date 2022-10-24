const express = require('express')
const router = express.Router()
const {getTodo, addTodo, updateTodo, deleteTodo} = require('../controllers/todoController') 

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTodo).post(protect, addTodo)
router.route('/:id').delete(protect, deleteTodo).put(protect, updateTodo)

module.exports = router