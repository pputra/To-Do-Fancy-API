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
    },

    showAll: (req, res) => {
        User.findById({_id: req.decoded.id}).populate('todo').exec().then((user) => {
            ServerResponse.success(res, 200, 'list of user tasks', user.todo);
        }).catch((err) => {
            ServerResponse.error(res, 500, err);
        });
    },

    markAsComplete: (req, res) => {
        Task.findOneAndUpdate({_id: req.body.id}, {$set: {isComplete: true}}).then((task) => {
            ServerResponse.success(res, 200, 'task has been marked as complete', task); //task output is the found data
        }).catch((err) => {
            ServerResponse.error(res, 500, err);
        });
    },

    update: (req, res) => {
        let {name, description, due_date} = req.body;
        Task.update({_id: req.body.id}, {
            name,
            description,
            due_date
        }).then((task) => {
            ServerResponse.success(res, 200, 'task has been updated', task); //task output is the number of affected data
        }).catch((err) => {
            ServerResponse.error(res, 500, err);
        });
    },

    delete: (req, res) => {
        
        Task.deleteOne({_id: req.body.id}).then((task) => {
            ServerResponse.success(res, 200, `${req.body.id} task has been deleted`, task);
        }).catch((err) => {
            ServerResponse.error(res, 500, err);
        });
    },

    findById: (req, res) => {
        Task.findById(req.body.id).then((task) => {
            ServerResponse.success(res, 200, `${req.body.id} task information`, task);
        }).catch((err) => {
            ServerResponse.error(res, 500, err);
        });
    }
};
