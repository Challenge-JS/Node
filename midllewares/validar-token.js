const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarToken = async(req, res , next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.json({
            ok:false,
            msg:'Token invalido'
        });
    }
    try {
       

    const {uid} = jwt.verify(token,process.env.CLAVE_SECRETA);
    if(!uid){
        return res.json({
            ok:false,
            msg:'El token no es valido'
        });
    }
    
    
    const usuario = await Usuario.findByPk(uid);
    if(!usuario){
        return res.json({
            ok:false,
            msg:'Usuario no existe en db'
        });
    }
    
    
    
    req.usuario = usuario;
    

    next();
    } catch (error) {
        console.log(error);
        return res.json({
            ok:false,
            msg:'Error'
        });
    }
    

    

}

module.exports = validarToken;