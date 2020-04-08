const mysql = require('mysql')

// promisify the DB client 

class DatabaseClient {

    constructor(config) {
        this.connection = mysql.createConnection(config)
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, results) => {
                if (err) {
                    return reject(err)
                }
                resolve(results)
            })
        })
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end( err => {
                if (err) {
                    return reject(err)
                }
                resolve()
            })
        })
    }
}

// conenciton config 

config = {
    host: "localhost",
    database: "node_test",
    user: "root",
    password: "sporerules"
}

const dbh = new DatabaseClient(config)
dbh.query('SELECT * FROM example').then(results => {
    console.log(results)
    return dbh.close()  // continue with .catch() if err
})