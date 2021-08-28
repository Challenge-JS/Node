const {DataTypes} = require('sequelize');
const db = require('../db/connection');
const Usuario = require('./usuario');

const Operacion = db.define('Operacion',{
    concepto:{
       type:DataTypes.STRING 
    },
    monto:{
       type:DataTypes.STRING 
    },
    tipo:{
       type:DataTypes.STRING 
    },
    idUser: {
      type: DataTypes.INTEGER,
      model: 'Usuario', 
      key: 'id', 
   }
});

Usuario.hasMany(Operacion, {foreignKey: 'idUser',foreignKeyConstraint:true});
Operacion.belongsTo(Usuario, {foreignKey: 'idUser'});
module.exports = Operacion;

