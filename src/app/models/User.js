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
    static all(res){
        let database = new Database('localhost', 'root', '','trading-app');
        const conn = database.connect();

        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM users', (err, results, fields) => {
               resolve(results);
               reject(err);
            });
        });
    }

    /**
     * Fetch one instance of User from database
     * 
     * @param id
     * @return User $user
     */
     static find(id){
        let database = new Database('localhost', 'root', '','trading-app');
        const conn = database.connect();

        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM users WHERE id = ${id}`, (err, result, fields) => {
                resolve(result);
                reject(err);
            });
        });
    }

    /**
     * Fetch User from database by email
     * 
     * @param email
     * @return User $user
     */
    static findByEmail(email, callback){
        let database = new Database('localhost', 'root', '','trading-app');
        const conn = database.connect();

        return new Promise((resolve, reject) => {
            conn.query(`SELECT id, email, password FROM users WHERE email = '${email}'`, (err, result, fields) => {
                resolve(result);
                reject(err);
            });
        });
    }

    /**
     * create an instance of User in the database
     * 
     * @param req
     * @param res
     * @return User $user
     */
     static create(req){
        let database = new Database('localhost', 'root', '','trading-app');
        const conn = database.connect();

        const {name, email, password} = req.body;

        let hash = bcrypt.hashSync(password, 10);
        
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO users (name, email, password) VALUES('${name}', '${email}', '${hash}');`, (err, result) => {
                resolve(result);
                reject(err);
            });
        });
    }
}

module.exports = User;