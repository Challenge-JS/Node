const jwt = require('jsonwebtoken');

const  generarJWT = (uid, email)=>{
    return new Promise((resolve, reject ) =>{
        const payload = {uid, email};
        jwt.sign(payload, process.env.CLAVE_SECRETA,{
            expiresIn:'2h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })
    });
}
const comprobarJWT =(token = '')=>{
    

    try {
       
            const {uid} = jwt.verify(token, process.env.CLAVE_SECRETA);
            return [true, uid];
            
                
    } catch (error) {
        return [false, null];
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}