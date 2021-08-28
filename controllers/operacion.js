const { response } = require("express");
const Operacion = require("../models/operacion");
const Usuario = require("../models/usuario");


const getOperacion = async(req, res = response) => {
    try {
        const operaciones = await Operacion.findAll({
            include:[
                Usuario
            ]
        });
        res.json({
            ok:true,
            operaciones
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok:false,
            msg:'Hable con el admin'
        })
    }
}
const newOperacion = async(req, res = response) => {
    try {
        const operacion = new Operacion(req.body);
        await operacion.save();
        res.json({
            ok:true,
            operacion
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok:false,
            msg:'Hable con el admin'
        })
    }
}
const editOperacion = async(req, res = response) => {
    try {
        const id = req.params.id;
        const {concepto, monto} = req.body;
        const operacion = await Operacion.findByPk(id);
        if(!operacion){
            return res.json({
                ok:false,
                msg:'La operacion no existe'
            });
        }
        await operacion.update({
            concepto:concepto,
            monto:monto,
            include:[
                Usuario
            ]
        });
        res.json({
            ok:true,
            operacion
        })
    } catch (error) {
        res.json({
            ok:false,
            msg:'Hable con el admin'
        })
    }
}
const deleteOperacion = async(req, res = response) => {
    try {
        const id = req.params.id;
        const operacion = await Operacion.findByPk(id);
        if(!operacion){
            return res.json({
                ok:false,
                msg:'La operacion no existe'
            });
        }
        await operacion.destroy();
        res.json({
            ok:true,
            msg:'Operacion borrada'
        })
    } catch (error) {
        res.json({
            ok:false,
            msg:'Hable con el admin'
        })
    }
}

module.exports = {
    getOperacion,
    newOperacion,
    editOperacion,
    deleteOperacion
}