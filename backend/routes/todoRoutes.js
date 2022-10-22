const express = require('express')
const router = express.Router()
const {getTodo, addTodo, updateTodo, deleteTodo} = require('../controllers/todoController') 

router.route('/').get(getTodo).post(addTodo)
router.route('/:id').delete(deleteTodo).put(updateTodo)

module.exports = router