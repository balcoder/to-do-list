var mongoose = require('mongoose');


// Create our Schema
var todoShema = new mongoose.Schema({
  name: {
    type: String,
    required: "We need an frekin name please"
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})


//Compile our Schema into a model

var Todo = mongoose.model('Todo', todoShema);

// export it so we can require it in our index.js
module.exports = Todo;
