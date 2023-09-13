const express = require('express');
const app = express();
const routerBase = require('./routes/routes.js')


require('dotenv').config();
const port = process.env.PUERTESITO;
app.use(express.json());

app.listen(port,() =>{
    console.log('Servidor inicializado');
})

app.use('/hamburguesas',routerBase)