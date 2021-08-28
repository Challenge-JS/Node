const {Router} = require('express');
const { check } = require('express-validator');
const { getOperacion, newOperacion, editOperacion, deleteOperacion } = require('../controllers/operacion');
const validarCampos = require('../midllewares/validar-campos');
const validarToken = require('../midllewares/validar-token');

const router = Router();

router.get('/',validarToken, getOperacion );
router.post('/',[
    check('concepto','Ingrese valor valido').not().isEmpty(),
    check('monto','Ingrese valor valido').not().isEmpty(),
    check('tipo','Ingrese valor valido').not().isEmpty(),
    validarToken,
    validarCampos
],newOperacion);
router.put('/:id',[
    check('concepto','Ingrese valor valido').not().isEmpty(),
    check('id','Ingrese valor valido').not().isEmpty(),
    check('monto','Ingrese valor valido').not().isEmpty(),
    check('tipo','Ingrese valor valido').not().isEmpty(),
    validarToken,
    validarCampos
], editOperacion);
router.delete('/:id',[
    check('id','Ingrese valor valido').not().isEmpty(),
    validarToken,
    validarCampos
    ]
    ,deleteOperacion);


module.exports = router;