const express = require('express');
const {MongoClient} = require('mongodb');

require('dotenv').config();
const router = express.Router();

const bases = process.env.DATABASESITA;
const nombreBase = "hamburgueseria_taller";

router.get('/holi',async (req,res) => {
    try {
       res.json('Estoy funcionando') ;
    } catch (error) {
        res.json('Estoy mal');
    }
})

//? Encontrar todos los ingredientes cone stock menor a 400

router.get('/ejercicio1',async (req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('ingredientes');
        const result = await collection.find({stock:{$lt : 400}}).toArray();

        res.json(result);
        client.close();
    } catch (e) {
        res.status(404).json("No se encontró el dato");
    }
})


module.exports = router