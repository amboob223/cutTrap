const Pool = require("pg").Pool
const pool = new Pool(
    {
        user:"playabook",
        database:"barber",
        port:5432,
        password:"8896",
        host:"localhost",

    }
)

module.exports = pool;