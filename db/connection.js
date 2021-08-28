const {Sequelize} = require('sequelize');
const db = new Sequelize('javascript','root','',{
    host: 'localhost',
    dialect:'mysql',
    logging:false
});

module.exports = db;