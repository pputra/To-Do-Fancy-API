var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');
const ActivityController = require('../controllers/activityController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('home');
});

router.post('/register', UserController.register);

router.post('/login', UserController.login);



//router.post('/activity/add', ActivityController.add);

//router.get('/:id', UserController.findById);


module.exports = router;
