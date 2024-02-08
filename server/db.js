const Pool = require("pg").Pool
const pool = new Pool(
    {
        user:"postgres",
        database:"barber",
        port:5432,
        password:"8896",
        host:"localhost",

    }
)

module.exports = pool;