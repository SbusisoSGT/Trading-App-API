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

        result.then(user => { this.validateLogin(password, user, res) })
                .catch(err => { console.log(err) });
    }

    register(req, res){
        let result = User.create(req);

        result.then(() => {
            const authToken = attemptLogin(req.body.email);
            res.cookie('authToken', authToken, {maxAge: 7200000}); // Signed token expires after 2hrs 
            res.json(authToken);
        })
                .catch((err) => {
                    console.log(err);
                });
    }

    /**
     * 
     * Login user into the application and return their Auth token
     * 
     * @param email
     * @return authToken
     */
    attemptLogin(email){
        let authToken = this.createAuthToken();
        const credentials = {email: email, authToken: authToken};

        let result = User.saveAuthToken(credentials);

        result.catch(err => {console.log(err)});
        
        return authToken;
    }

    /**
     * Validate user's login request
     * 
     * @param password 
     * @param user 
     * @param res 
     */
    validateLogin(password, user, res){
        if(Array.isArray(user) && user.length ==! 0){
            const hash = user[0].password;
            
            if(bcrypt.compareSync(password, hash)){
                const authToken = this.attemptLogin(user[0].email);
                res.cookie('authToken', authToken, {maxAge: 7200000}); // Signed token expires after 2hrs
                res.json(authToken);
            }else
                res.status(403).json('Email or password invalid!');
        }else
            res.status(403).json('Email or password invalid!');
    }
}

module.exports = AuthController;