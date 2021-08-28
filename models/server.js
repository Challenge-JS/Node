const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const db = require('../db/connection');


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.auth = '/api/auth'; 
        this.operacion = '/api/operacion'; 
       this.dbConnection();
    }
    middlewares(){
        this.app.use(express.static(path.resolve(__dirname,'../public')));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(this.auth,require('../routes/auth'));
        this.app.use(this.operacion,require('../routes/operacion'));
    }
    async dbConnection(){
        try {
            await db.authenticate();
            console.log('DB Online')
        } catch (error) {
            throw new Error(error);
        }
    }

    init(){
        this.middlewares();
        this.server.listen(this.port, ()=>{
            console.log(`Server corriendo en el puerto  ${this.port}`);
        })
    }
}

module.exports = Server;