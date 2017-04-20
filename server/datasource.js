require('dotenv').config()
module.exports = {
  "PostgresConnection": {
    "host": process.env.DEVELOPMENT_HOST,
    "port": process.env.DEVELOPMENT_PORT,
    "url": process.env.DEVELOPMENT_URL,
    "database": process.env.DEVELOPMENT_DATABASE,
    "password": process.env.DEVELOPMENT_PASSWORD,
    "name": process.env.DEVELOPMENT_NAME,
    "user": process.env.DEVELOPMENT_USER,
    "connector": process.env.DEVELOPMENT_CONNECTOR
  },
  "db": {
    "name": process.env.MEMORY_DB_NAME,
    "connector": process.env.MEMORY_CONNECTOR
  },
}
