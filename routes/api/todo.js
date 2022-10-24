const router = require("express").Router();
const TodoController = require("../../controllers/todo.controller");
const authenticate = require('../middleware/middleware.js')

router.post('/add', authenticate, TodoController.create);
router.get("/view/:email", authenticate, TodoController.view); //view all todos for a user
router.put("/update/:id", authenticate, TodoController.update); //update a todo with a specific id
router.delete("/delete/:id", authenticate, TodoController.delete); //delete a todo with a specific id

module.exports = router;
