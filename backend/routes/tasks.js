const express = require("express");
const router = express.Router();
const taskController = require('../controllers/tasks');
const checkAuth = require('../middlewares/check-auth');

router.get('/getUserAllTasks', checkAuth, taskController.getUserAllTasks);
router.post('/createUserTask', checkAuth, taskController.createTask);
router.post('/updateUserTask', checkAuth, taskController.updateTask);

module.exports = router;