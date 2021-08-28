const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario")


const register = async(req,res = response)=>{
    try {
        const {email} = req.body;
        const verificarEmail =await Usuario.findOne({
            where:{
                email
            }
        });
        if(verificarEmail){
            return res.json({
                ok:false,
                msg:'El usuario ya existe'
            })
        };
        const usuario = new Usuario(req.body);
        await usuario.save();
        const token = await generarJWT(usuario.id,usuario.email);
        res.json({
            ok:true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error)
        res.json({
            ok:false,
            msg:'Hable con el admin'
        })
    }

}
const login = async(req,res = response)=>{
    try {
        const {email,password} = req.body;
        const verificarEmail = await Usuario.findOne({
            where:{
                email
            }
        });
        if(!verificarEmail || verificarEmail.password !== password){
            return res.json({
                ok:false,
                msg:'Datos invalidos'
            })
        };
        
        const token = await generarJWT(verificarEmail.id,verificarEmail.email);
        res.json({
            ok:true,
            usuario:verificarEmail,
            token
        })
    } catch (error) {
        res.json({
            ok:false,
            msg:'Hable con el admin'
        })
    }

}
const renewJWT = async(req, res=response)=>{
    const usuario = req.usuario;
    const {_id, email} = req.usuario;

    const token  = await generarJWT(_id, email);

    res.status(201).json({
        ok:true,
        usuario,
        token
    })
    

}

module.exports = {
    register,
    login,
    renewJWT,
}