$(document).ready(function(){

  $.getJSON("/api/todos")
  .then(addTodos)
  .catch(function(err){
    console.log(err)
  })

  document.querySelector('#todoInput').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      // code for enter
      createTodo();
    }
  });

  function addTodos(todos) {
    // add our todos to the page
    todos.forEach(function(el,i){
      var liNode = document.createElement("li"); // create li node
      liNode.classList.add("task");
      if(todos[i].completed) {  liNode.classList.add("done"); }
      var todo = document.createTextNode(todos[i].name);// create text node
      liNode.appendChild(todo);// add the todo to the li
      document.getElementsByClassName('list')[0].appendChild(liNode);

    })
  }

  function createTodo(){
    // send input as post to api
    var newTodo = document.getElementById('todoInput').value;
    $.post('/api/todos', {name: newTodo })
    .then(function(newDo){
      console.log(newDo);
      //location.reload();
    })
    .catch(function(err){
      console.log(err);
    })

  }





});
