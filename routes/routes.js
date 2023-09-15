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

//? -1-Encontrar todos los ingredientes cone stock menor a 400

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

//? -2-Econtrar todas las hamburguesas con categoria 'Vegetariana'

router.get('/ejercicio2',async (req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find({categoria:'Vegetariana'}).toArray();
        res.json(result);
        client.close();
    } catch (e) {
        res.status(500).json('No se encuentra dicha categoria')
    }
})

//? -3-Encontrar todos los chefs que se especializan en 'Carnes'

router.get('/ejercicio3',async(req,res)=>{
     try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('chefs');
        const result = await collection.find({especialidad:'Carnes'}).toArray();
        res.json(result);
        client.close();
     } catch (e) {
        res.status(500).json('No se han encontrado Chefs con esta especialidad')
     }
})


//? -4-Aumentar en 1.5 el precio de todos los ingredientes

router.put('/ejercicio4', async(req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('ingredientes');
        const result = await collection
    } catch (e) {
        res.status(500).json('No found')
    }
})

//? -5.-Encontrar todas las hamburguesas preparadas por “ChefB”

router.get('/ejercicio5',async(req,res)=>{
    try {
        const cliente = new MongoClient(bases);
        await cliente.connect()
        const db = cliente.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find({chef:'ChefB'}).toArray();
        res.json(result);
        cliente.close();
    } catch (e) {
        res.status(500).json('No hay hamburguesas preparadas por ese chef')
    }
})

//? -6.-Encontrar el nombre y la descripción de todas las categorías

router.get('/ejercicio6',async (req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('categorias');
        const result = await collection.find().toArray();
        res.json(result);
        client.close();
    } catch (e) {
        res.status(500).json('Not Found')
    }
})

//? -7.-Eliminar todos los ingredientes que tengan un stock de 0

    router.get('/ejericicio7',async(req,res)=>{
        try {
            const client = new MongoClient(bases);
            await client.connect();
            const db = client.db(nombreBase);
            const collection = db.collection('ingredientes');
            const result = await collection.deleteMany({stock:0})  //todo => Esto hara que nos borre todos los elementos que cumplan con el parametro
            return result.deletedCount <= 0 ? console.log(`Se elimaron${result.deletedCount} ingredientes con stcok : 0` ): console.log(`No se encontraron ingredientes con stock : 0 para eliminar`);
        } catch (e) {
            res.status(500).json('Not found');
        }finally{
            await client.close();
        }
    })

//? -8.-Agregar un nuevo ingrediente a la hamburguesa “Clásica”

router.get('/ejericico8',async (req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find().toArray();
        res.json(result);
        client.close();

    } catch (e) {
        res.status(500).json('Not found')
    }
})

//? -9.-Encontrar todas las hamburguesas que contienen “Pan integral” como ingrediente

router.get('/ejercicio9',async(req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find({ingredientes:'Pan integral'}).toArray();
        res.json(result);
        client.close();

    } catch (e) {
        res.status(500).json('Not Found')
    }
})

//? -10-Cambiar la especialidad del “ChefC” a “Cocina Internacional”


//? -11-Encontrar el ingrediente más caro

router.get('/ejercicio11',async (req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('ingredientes');
        const result = await collection.find().sort({precio: -1}).limit(1).toArray();
        res.json(result);
        client.close();

    } catch (e) {
        res.status(500).json('Not found');
    }
})

//? -12-Encontrar las hamburguesas que no contienen “Queso cheddar” como ingrediente

router.get('/ejercicio12',async (req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find({$nor:[{ingredientes:'Queso cheddar'}]}).toArray();
        res.json(result);
        client.close();
    } catch (e) {
        res.status(500).json('Not found')
    }
})

//? -13-Incrementar el stock de “Pan” en 100 unidades


//? -14-Encontrar todos los ingredientes que tienen una descripción que contiene la palabra “clásico”

router.get('/ejercicio14',async (req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('ingredientes');
        const result = await collection.find({descripcion:{$regex:/clásico/i}}).toArray();
        res.json(result);
        client.close();
    } catch (e) {
        res.status(500).json('Not found');
    }
})

//? -15-Listar las hamburguesas cuyo precio es menor o igual a $9


//? -16-Contar cuántos chefs hay en la base de datos


//? -17-Encontrar todas las categorías que contienen la palabra “gourmet” en su descripción

router.get('/ejercicio17',async (req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('categorias');
        const result = await collection.find({descripcion:{$regex:/gourmet/i}}).toArray()
        res.json(result);
        client.close();
    } catch (e) {
        res.status(500).json('Not found')
    }
})

//? -18-Eliminar las hamburguesas que contienen menos de 5 ingredientes


//? -19-Agregar un nuevo chef a la colección con una especialidad en “Cocina Asiática”


//? -20-Listar las hamburguesas en orden ascendente según su precio



//? -21-Encontrar todos los ingredientes cuyo precio sea entre $2 y $5

router.get('/ejercicio21',async(req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('ingredientes');
        const result = await collection.find({precio:{$gte:2 , $lt:5}}).toArray();
        res.json(result)
        client.close();

    } catch (e) {
        res.status(500).json('Not found')
    }
})

//? -22-Actualizar la descripción del “Pan” a “Pan fresco y crujiente”


//? -23-Encontrar todas las hamburguesas que contienen “Tomate” o “Lechuga” como ingredientes

router.get('/ejercicio23',async(req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find({$or:[{ingredientes:'Tomate'},{ingredientes:'Lechuga'}]}).toArray();
        res.json(result)
        client.close();
    } catch (e) {
        res.status(500).json('Not found')
    }
})

//? -24-Listar todos los chefs excepto “ChefA”


//? -25-Incrementar en $2 el precio de todas las hamburguesas de la categoría “Gourmet”


//? -26-Listar todos los ingredientes en orden alfabético


//? -27-Encontrar la hamburguesa más cara

router.get('/ejercicio27',async (req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find().sort({precio:-1}).limit(1).toArray();
        res.json(result);
        client.close();
    } catch (e) {
        res.status(500).json('Not found')
    }
})

//? -28-Agregar “Pepinillos” a todas las hamburguesas de la categoría “Clásica”


//? -29-Eliminar todos los chefs que tienen una especialidad en “Cocina Vegetariana”


//? -30-Encontrar todas las hamburguesas que contienen exactamente 7 ingredientes


//? -31-Encontrar la hamburguesa más cara que fue preparada por un chef especializado en “Gourmet”


//? -32-Listar todos los ingredientes junto con el número de hamburguesas que los contienen


//? -33-Listar los chefs junto con el número de hamburguesas que han preparado


//? -34-Encuentra la categoría con la mayor cantidad de hamburguesas


//? -35-Listar todos los chefs y el costo total de ingredientes de todas las hamburguesas que han preparado


//? -36-Encontrar todos los ingredientes que no están en ninguna hamburguesa


//? -37-Listar todas las hamburguesas con su descripción de categoría


//? -38-Encuentra el chef que ha preparado hamburguesas con el mayor número de ingredientes en total


//? -39-Encontrar el precio promedio de las hamburguesas en cada categoría


//? -40-Listar los chefs y la hamburguesa más cara que han preparado


module.exports = router