const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
    config.db_database,
    config.db_user,
    config.db_pwd,
    {
        host: config.db_host,
        port: config.db_port,
        dialect: config.db_dialect,
        logging: console.log,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        //for SQLite
        storage: 'path/to/database.sqlite'
    },
);

// db connection test
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;