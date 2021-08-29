const { response } = require("express");
const Operacion = require("../models/operacion");
const Usuario = require("../models/usuario");


const getOperacion = async(req, res = response) => {
    try {
        const operaciones = await Operacion.findAll({
            include: [{
                model:Usuario, 
                attributes: ['email']
             
            }]
        });
        let ingresos = 0;
        let egresos = 0;
        operaciones.map(o=> o.tipo === 'INGRESO' ? ingresos = ingresos + o.monto : egresos = egresos + o.monto );
        res.json({
            ok:true,
            operaciones,
            ingresos,
            egresos
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
        req.body.idUser = req.usuario.id;
        const operacion = new Operacion(req.body);
        await operacion.save();
        operacion.Usuario = req.usuario;
        res.json({
            ok:true,
            operacion:{
                ...operacion.dataValues,
                Usuario:req.usuario
            }
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
        const lastMonto = operacion.monto;
        if(!operacion){
            return res.json({
                ok:false,
                msg:'La operacion no existe'
            });
        }
        await operacion.update(req.body);
        res.json({
            ok:true,
            operacion:{
                ...operacion.dataValues,
                Usuario:req.usuario
            },
            lastMonto
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