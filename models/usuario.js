const {DataTypes} = require('sequelize');
const db = require('../db/connection');

const Usuario = db.define('Usuario',{
    email:{
       type:DataTypes.STRING 
    },
    password:{
       type:DataTypes.STRING 
    },
});

module.exports = Usuario;

