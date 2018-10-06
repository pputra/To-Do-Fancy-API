const router = require('express').Router();
const TaskController = require('../controllers/taskController');

router.get('/', (req, res) => {
    res.send('task');
})

router.post('/', TaskController.add);


module.exports = router;