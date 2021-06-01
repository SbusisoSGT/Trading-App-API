const crypto = require('crypto');
const bcrypt = require('bcrypt');
let User = require('./../models/User.js');

class AuthController{

    createAuthToken(){
        return crypto.randomBytes(30).toString('hex');
    }

    login(req, res){
        const {email, password} = req.body;
        
        let result = User.findByEmail(email);

        result.then((user) => { this.authenticate(password, user, res) })
                .catch((err) => { console.log(err) });
    }

    register(req, res){
        let result = User.create(req);

        result.then(() => {
            let authToken = this.createAuthToken();
            res.cookie('token', authToken);
            res.send(authToken);
        })
                .catch((err) => {
                    console.log(err);
                });
    }

    authenticate(password, user, res){
        if(Array.isArray(user) && user.length ==! 0){
            const hash = user[0].password;
            
            if(bcrypt.compareSync(password, hash)){
                const authToken = this.createAuthToken();
                res.cookie('AuthToken', authToken);
                res.send(authToken);
            }else
                res.status(403).send('Email or password invalid!');
        }else
            res.status(404).send('User email not found!!');
    }
}

module.exports = AuthController;