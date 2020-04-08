const util = require('util')
const mysql = require('mysql')

config = {
    host: "localhost",
    database: "node_test",
    user: "root",
    password: "sporerules"
}

// factory async wrapper for DB client

function DBHandlerFactory(config) {
    const connection = mysql.createConnection(config)

    return {
        query(sql, args) {
            return util.promisify(connection.query)
                .call(connection, sql, args)
        },

        close() {
            return util.promisify(connection.end).call(connection)
        }
    }
}

// usage 

async function DBExecute() {
    const db = DBHandlerFactory(config)
    try {
        const results = await db.query('SELECT * FROM example;')
        return results
    } catch (err) {
        console.log(err.message)
    } finally {
        await db.close()
    }
}

const billieJean = DBExecute().then( results => {
    console.log(results)
})
