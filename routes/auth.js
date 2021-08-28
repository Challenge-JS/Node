const {Router} = require('express');
const { check } = require('express-validator');
const { newUsuario, login, register, renewJWT } = require('../controllers/auth');
const validarCampos = require('../midllewares/validar-campos');
const validarToken = require('../midllewares/validar-token');
const router = Router();

router.post('/', login);
router.post('/register',[
    check('email','Ingrese email valido').isEmail(),
    check('password','El password no puede ser nulo').not().isEmpty(),
    validarCampos
], register);
router.get('/',validarToken, renewJWT);


module.exports = router;