let mysql = require('mysql');

class Database
{
    constructor(host, username, password, database){
        this.host = host;
        this.username = username;
        this.password = password;
        this.database = database;
    }

    connect () {
        let conn = mysql.createConnection({
            host: this.host,
            user: this.username,
            password: this.password,
            database: this.database,
          });

          conn.connect((err) => {
            if(err) console.error(`Error connection: ${err.stack}`);
                return;
            console.log(`Connected as id: ${conn.threadId}`);
        });

        return conn;
    }
};

module.exports = Database;