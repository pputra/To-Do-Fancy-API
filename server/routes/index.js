var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');
const TaskController = require('../controllers/taskController');
const Middlewares = require('../middlewares');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('home');
});

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.use(Middlewares.isLogin);

router.get('/:id', UserController.findById);

router.post('/task/add', TaskController.add);




module.exports = router;
