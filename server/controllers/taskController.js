const Task = require('../models/task');
const User = require('../models/user');
const ServerResponse = require('../helpers/serverResponse');

module.exports = {
    add: (req, res) => {
        
        req.body.isComplete = false;
        
        let {user, name, description, isComplete, due_date} = req.body

        
        
        Task.create({
            user,
            name,
            description,
            isComplete,
            due_date
        }).then((task) => {
            
            User.findOneAndUpdate({_id: req.decoded.id}, { $push : {todo: task._id}}).then((user) => {
                ServerResponse.success(res, 200, 'a new task has been added to user', task);
            }).catch((err) => {
                ServerResponse.error(res, 500, err);
            });
    
        }).catch((err) => {
            ServerResponse.error(res, 500, err);
        });
    }
};
