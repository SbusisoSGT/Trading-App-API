let express = require('express');
let bodyParser = require('body-parser');
let Database = require('./src/app/config/Database.js');
let User = require('./src/app/models/User.js');

let app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello world!");
});

app.get('/users', (req, res) => {
    user = new User();
    user.all(res);
});

app.get('/users/:id', (req, res, id) => {
    user = new User();
    user.find(res, req.params.id);
});

app.post('/register', (req, res) => {
    user = new User();
    user.create(req, res);
});



app.listen(8001);