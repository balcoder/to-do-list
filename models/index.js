const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://todolist_admin:Tarpon101@ds125526.mlab.com:25526/todolist',{useNewUrlParser: true});

mongoose.Promise = Promise;


// export our Todo model
module.exports.Todo = require("./todo");
