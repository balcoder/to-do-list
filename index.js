const express = require('express'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser');

const todoRoutes = require('./routes/todos')

console.log(__dirname)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => res.sendFile("/index.html"));


app.use('/api/todos', todoRoutes);

app.listen(port, () => console.log(`Listening on port ${port}!`))
