const crypto = require('crypto');
let User = require('./../models/User.js');

class AuthController{

    createAuthToken(){
        return crypto.randomBytes(30).toString('hex');
    }

    login(req, res){
        const {email, password} = req.body;

        let usr = new User();
        let result = usr.findByEmail(req, res);
        
        
        result.then((user) => {
            res.send(user);
        })
                .catch((err) => {
                    console.log(err);
                });

        // bcrypt.compareSync(password, hash);
        // res.cookie('AuthToken', authToken);
    }

    register(req, res){
        let user = new User();

        let result = user.create(req, res);

        result.then(() => {
            let authToken = this.createAuthToken();
            res.cookie('token', authToken);
            res.send(authToken);
        })
                .catch((err) => {
                    console.log(err);
                });
    }
}

module.exports = AuthController;