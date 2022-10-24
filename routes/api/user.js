const router = require("express").Router();
const UserController = require("../../controllers/user.controller");
const authenticate = require('../middleware/middleware.js')

router.post('/create', UserController.create);
router.post('/login', UserController.login);
router.get('/', UserController.viewAll);
router.get("/view/:email", authenticate, UserController.view);
router.put("/update/:email", authenticate, UserController.update);
router.delete("/delete/:email", authenticate, UserController.delete);

module.exports = router;
