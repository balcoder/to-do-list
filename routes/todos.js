var express = require('express');
var router = express.Router();
var db = require('../models')

var helpers = require('../helpers/todos')


router.route('/')
.get(helpers.getTodo) //finds everything
.post(helpers.createTodo)


router.route('/:todoId')
.get(helpers.findTodo)
.put(helpers.putTodo)
.delete(helpers.deleteTodo)

module.exports = router;
