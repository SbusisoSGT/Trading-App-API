const bcrypt = require('bcrypt');
let Database = require('./../config/Database.js');


class User
{
    constructor(){
        let database = new Database('localhost', 'root', '','trading-app');
        this.conn = database.connect();
        this.table = 'users';
    }

    /**
     * Fetch all Users in database
     * 
     * @param res
     * @return User $users
     */
    all(res){
        this.conn.query('SELECT * FROM users', (err, results, fields) => {
            if(err) 
                throw err;
           res.send(results); 
        });
    }

    /**
     * Fetch one instance of User from database
     * 
     * @param res
     * @param id
     * @return User $user
     */
     find(res, id){
        this.conn.query(`SELECT * FROM users WHERE id = ${id}`, (err, result, fields) => {
            if(err) 
                throw err;
           res.send(result); 
        });
    }

    /**
     * Fetch one instance of User from database
     * 
     * @param req
     * @param res
     * @return User $user
     */
     create(req, res){
        const {name, email, password} = req.body;

        let hash = bcrypt.hashSync(password, 10);

        this.conn.query(`INSERT INTO users (name, email, password) VALUES('${name}', '${email}', '${hash}');`, (err, result) => {
            if(err) 
                throw err;
           res.send(result); 
        });
    }

}

module.exports = User;