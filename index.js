const express = require('express');
// const cookieParser = require("cookie-parser");
let Database = require('./src/app/config/Database.js');
let User = require('./src/app/models/User.js');
let AuthController = require('./src/app/controllers/AuthController.js');

let app = express();
app.use(express.json());
// app.use(cookieParser);

app.get('/', (req, res) => {
    res.send("Hello world!");
});

app.get('/users', (req, res) => {
    user = new User();
    result = user.all(res);

    result.then((val) => { res.send(val);})
            .catch((err) => { console.log(err)});
});

app.get('/users/:id', (req, res, id) => {
    user = new User();
    let result = user.find(res, req.params.id);

    result.then((val) => { res.send(val);})
            .catch((err) => { console.log(err)});
});

app.post('/register', (req, res) => {
    let auth = new AuthController();

    auth.register(req, res);
});

app.post('/login', (req, res) => {
    let auth = new AuthController();

    auth.login(req, res); 
});


app.listen(8001, () => {
    console.log('Server running at 127.0.0.1:8001');
});