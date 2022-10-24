const router = require("express").Router();
const TodoController = require("../../controllers/todo.controller");
const authenticate = require('../middleware/middleware.js')

router.post('/add', authenticate, TodoController.create); // I can add a new task
router.get("/view/:userId", authenticate, TodoController.view); //view all todos for a user
router.put("/update/:taskId", authenticate, TodoController.update); //I can complete a task(update a todo with a specific id)
router.delete("/delete/:userId", authenticate, TodoController.deleteAll); //I can remove all tasks under the Completed tab
router.delete("/delete/taskId", authenticate, TodoController.delete); //I can remove one task under the Completed tab

module.exports = router;
