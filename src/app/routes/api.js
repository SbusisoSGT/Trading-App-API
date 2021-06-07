const express = require('express');
const api = express.Router();
const cors = require('cors');
const cookieParser = require("cookie-parser")('cookie-secret');
let User = require('./../models/User.js');
let AuthController = require('./../controllers/AuthController.js');


api.use(cors());
api.use(express.json());
api.use(cookieParser);

api.get('/', (req, res) => {
    res.send("Hello world!");
});

api.get('/users', (req, res) => {
    result = User.all(res);

    result.then((val) => { res.send(val);})
            .catch((err) => { console.log(err)});
});

api.get('/users/:id', (req, res, id) => {
    
    let result = User.find(req.params.id);

    result.then((val) => { res.send(val);})
            .catch((err) => { console.log(err)});
});

api.post('/register', (req, res) => {
    let auth = new AuthController();

    auth.register(req, res);
});

api.post('/login', (req, res) => {
    let auth = new AuthController();

    auth.login(req, res); 
});

api.get('/users/:id/accounts', (req, res, id) => {
    let user = User.account(req.params.id);

    user.then(result => res.send(result))
            .catch(errr => console.log(err));
            
});

api.post('/account/:id', () => {

});

module.exports = api;
