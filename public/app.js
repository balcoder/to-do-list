$(document).ready(function(){

// When page is loaded get todos and add to the page
  $.getJSON("/api/todos")
  .then(addTodos)
  .catch(function(err){
    console.log(err)
  })

  //when enter is pressed add todo to database
  document.querySelector('#todoInput').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      // code for enter
      createTodo();
    }
  });

  // when li is clicked toggle completed and update page
  $('.list').on('click', 'li', function(){
    //console.log($(this));
    var status = $(this).hasClass('done');
    if(status){
      $(this).removeClass('done');
    } else {
      $(this).addClass('done')
    }

    console.log("clicked the li");
    console.log($(this)[0].dataset.id);
    updateTodo($(this), status);
  })

  // when X is pressed delete todo from page and database
  $('.list').on('click', 'span', function(event){
    event.stopPropagation();
    deleteTodo($(this).parent());
  })

  // insert each todo in a li inside the class task
  function addTodos(todos) {
    todos.forEach(function(todo){
      addTodo(todo)
    })
  }

  function addTodo(todo) {
    // create li node and add a classes and data attr
    var liNode = document.createElement("li");
    liNode.classList.add("task");
    var dataAtt = document.createAttribute("data-id")
    dataAtt.value = todo._id;
    var completedAtt = document.createAttribute("data-completed")
    completedAtt.value = todo.completed;
    liNode.setAttributeNode(completedAtt);
    liNode.setAttributeNode(dataAtt);
    if(todo.completed) { liNode.classList.add("done"); }

    var newTodo = document.createTextNode(todo.name);// create text node
    liNode.appendChild(newTodo);// add the todo to the li
    var spanNode = document.createElement("span") // create a span
    var spanText = document.createTextNode("X");
    spanNode.appendChild(spanText);
    liNode.appendChild(spanNode);
    document.getElementsByClassName('list')[0].appendChild(liNode);
  }


  // grab the input vlaue of new todo and post to our api
  function createTodo(){
    // send input as post to api
    var usrInput = document.getElementById('todoInput').value;
    $.post('/api/todos', {name: usrInput })
    .then(function(newtodo){
      addTodo(newtodo);
      document.getElementById('todoInput').value = "";
    })
    .catch(function(err){
      console.log(err);
    })
  }

  // delete todo
  function deleteTodo(parent){
    var id = parent[0].dataset.id;
    var deleteUrl = '/api/todos/' + id;
    $.ajax({
      method: 'DELETE',
      url: deleteUrl
    })
    .catch(function(err){
      console.log(err);
    })
    parent.remove();
  }

  // update todo
  function updateTodo(node, status){
    var putUrl = '/api/todos/' + node[0].dataset.id
     console.log(putUrl)
    var updateStatus = {completed: !status};
    $.ajax({
    method: "PUT",
    url: putUrl,
    data: updateStatus
    })
    .catch(function(err){
      console.log(err);
    })
  }





});
