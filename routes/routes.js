const express = require('express');
const {MongoClient} = require('mongodb');
const cli = require('nodemon/lib/cli');

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

router.put('/ejercicio10',async(req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('chefs');
        const filtro = {nombre :'ChefC'};
        const cambio = { $set: {especialidad : 'Cocina Internacional'}}
        const result = await collection.updateOne(filtro, cambio)
    }catch (e){
        res.status(500).json({error:'Error interno del servicio'})
    }finally{
        await client.close()
    }
})

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

router.put('/ejercicio13',async(req,res) =>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('ingredientes');
        const filtro = {nombre: 'Pan'};
        const actualizacion = {$inc:{stock:100}};
        const result = await collection.updateOne(filtro,actualizacion)
        if (result.modifiedCount > 0) {
            res.json({ message: 'Stock de "Pan" incrementado en 100 unidades.' });
        } else {
            res.status(404).json({ error: 'No se encontró el ingrediente "Pan".' });
        }
    } catch (e) {
        res.status(500).json({error:'Error interno en el servidor'})
    }finally{
        await client.close()
    }
})


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

router.get('/ejercicio15',async(req,res)=>{
    try {
        const client = new MongoClient(bases);
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find({precio: {$lte:9}}).toArray();
        result.length > 0 ? res.json(result) : res.status(404).json({error: 'No se encontraron hamburguesas con precio menor o igual a 9'})
    } catch (e) {
        res.status(500).json({error:'Error interno en el servidor'})
    }finally{
        await client.close()
    }
})

//? -16-Contar cuántos chefs hay en la base de datos

router.get('/ejercicio16',async(req,res)=>{
    const client = new MongoClient(bases);
    try {
         await client.connect();
         const db = client.db(nombreBase);
         const collection = db.collection('chefs');
         const result = await collection.countDocuments();
         res.json({result});
    } catch (e) {
        res.status(500).json({error:'Error interno en el servidor'});
    }finally{
        await client.close()
    }
})


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

router.delete('/ejercicio18',async(req, res)=>{
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const hamburguesaDelete = await collection.deleteMany({
            $expr: {
                $lt: [
                    {
                        $size: "$ingredientes"
                    }, 5
                ]
            }
        });
        if (hamburguesaDelete.deletedCount > 0) {
            res.json({type: 'Success', data: hamburguesaDelete});
        }else{
            res.json({type: 'Error',message: 'No hay hamburguesas a eliminar' })
        }
    } catch (error) {
        res.status(500).json({error:'Error interno en el servidor'})
    }finally{
        client.close();
    }
})


//? -19-Agregar un nuevo chef a la colección con una especialidad en “Cocina Asiática”

router.post('/ejercicio19',async(req,res)=>{
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('chefs');
        const result = await collection.insertOne({
            nombre:"ChefD",
            especialidad:"Cocina Asiática"
        })
        res.json(result);
    } catch (e) {
        res.status(500).json({error:'Error interno en el servidor'})
    }finally{
        await client.close();
    }
})


//? -20-Listar las hamburguesas en orden ascendente según su precio

router.get('/ejercicio20',async(req,res)=>{
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const result = await collection.find().sort({precio:1}).toArray();
        res.json(result);
    } catch (e) {
        res.status(500).json({error:'Error interno en el servidor'});
    }finally{
        await client.close()
    }
})


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

router.put('/ejercicio22/',async(req,res)=>{
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('ingredientes');
        const result = await collection.findOneAndUpdate(
            {nombre:'Pan'},
            {$set:{descripcion:'Pan fresco y crujiente'}},
            {returnOriginal:false}
        );
        res.json(result)
    } catch (e) {
        res.status(500).json({error:'Error interno en el servidor'})
    }
})

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

router.get('/ejercicio24',async(req,res)=>{
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('chefs');
        const result = await collection.find({nombre:{$ne:'ChefA'}}).toArray();
        res.json(result);
    } catch (e) {
        res.status(500).json({error:'Error interno en el servidor'})
    }finally{
        await client.close();
    }
})

//? -25-Incrementar en $2 el precio de todas las hamburguesas de la categoría “Gourmet”

router.put('/ejercicio25',async(req,res)=>{
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const filtro = {categoria:'Gourmet'};
        const modificacion = {$inc:{precio:2}};
        const result = await collection.updateMany(filtro,modificacion);
        res.json({result});
    } catch (e) {
        res.status(500).json({error:'Error interno en el servidor'})
    }
})

//? -26-Listar todos los ingredientes en orden alfabético

router.get('/ejercicio26',async(req,res)=>{
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('ingredientes')
        const result = await collection.find().sort({nombre:1}).toArray()
        res.json(result)
    } catch (e) {
        res.status(500).json({error:'Error interno del servidor'});
    }finally{
        await client.close();
    }
})

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

router.put('/ejercicio28',async(req,res)=>{
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas')
        const filtro = {categoria : 'Clásica'};
        const nuevoIngrediente = {$addToSet:{ingredientes:'Pepinillos'}};
        const result = await collection.updateMany(filtro,nuevoIngrediente);
        res.json(result)
    } catch (e) {
        res.status(500).json({error:'Error interno del servidor'});
    }finally{
        await client.close();
    }
})

//? -29-Eliminar todos los chefs que tienen una especialidad en “Cocina Vegetariana”

router.delete('/ejercicio29',async(req,res)=>{
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('chefs');
        const filtro = {especialidad:'Cocina Vegetariana'};
        const result = await collection.deleteMany(filtro);
        result.deletedCount > 0 ? res.json(`Se eliminaro ${result.deletedCount}`): res.json('No se encontraron Chefs con dicha especialidad')
    } catch (e) {
        res.status(500).json({error:'Error interno en el servidor'});
    }finally{
        await client.close()
    }
})

//? -30-Encontrar todas las hamburguesas que contienen exactamente 7 ingredientes

router.get('/ejercicio30',async(req,res)=>{
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const collection = db.collection('hamburguesas');
        const filtro = {$expr:{$eq:[{$size:'$ingredientes'},7] }};
        const result = await collection.find(filtro).toArray();
        res.json(result)
    } catch (e) {
        res.status(500).json({error:'Error interno en el servidor'});
    }finally{
        await client.close()
    }
})
//? -31-Encontrar la hamburguesa más cara que fue preparada por un chef especializado en “Gourmet”

router.get('/ejercicio31',async(req,res)=>{
    const client  = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const collectionHamburguesas = db.collection('hamburguesas');
        const collectionChefs = db.collection('chefs');
        const chefGourmet = await collectionChefs.findOne({especialidad:'Gourmet'})
        const pipeline = [
            {
                $match:{ chef: chefGourmet.nombre}
            },
            {
                $sort: {precio: -1}
            },
            {
                $limit: 1
            }
        ];
        const result = await collectionHamburguesas.aggregate(pipeline).toArray()
        res.json(result)     
    } catch (e) {
        res.status(500).json({error:'Error interno en el servidor'});
    }finally{
        await client.close()
    }
})

//? -32-Listar todos los ingredientes junto con el número de hamburguesas que los contienen

router.get('/ejercicio32',async(req,res)=>{
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const collectionHamburguesas = db.collection('hamburguesas');
        const pipeline = [
            {
                $unwind:'$ingredientes'
            },
            {
                $group:{
                    _id: '$ingredientes',
                    count: {$sum:1}
                }
            },
            {
                $sort:{_id:1}
            }
        ];
        const result = await collectionHamburguesas.aggregate(pipeline).toArray();
        res.json(result)

    } catch (e) {
        res.status(500).json({error:'Error interno en el servidor'});
    }finally{
        await client.close()
    }
})

//? -33-Listar los chefs junto con el número de hamburguesas que han preparado

router.get('/ejercicio33', async (req, res) => {
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const chefsCollection = db.collection('chefs');

        const pipeline = [
            {
                $lookup: {
                    from: 'hamburguesas', 
                    localField: 'nombre', 
                    foreignField: 'chef', 
                    as: 'hamburguesas' 
                }
            },
            {
                $project: {
                    _id: 1, 
                    nombre: 1, 
                    especialidad: 1,
                    numHamburguesas: { $size: '$hamburguesas' } 
                }
            },
            {
                $sort: { nombre: 1 } 
            }
        ];

        const result = await chefsCollection.aggregate(pipeline).toArray();

        res.json(result);
    } catch (e) {
        res.status(500).json({ error: 'Error interno en el servidor' });
    } finally {
        await client.close();
    }
});


//? -34-Encuentra la categoría con la mayor cantidad de hamburguesas

router.get('/ejercicio34', async (req, res) => {
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const categoriasCollection = db.collection('categorias');

        const pipeline = [
            {
                $lookup: {
                    from: 'hamburguesas', 
                    localField: 'nombre', 
                    foreignField: 'categoria', 
                    as: 'hamburguesas'
                }
            },
            {
                $project: {
                    _id: 0, 
                    nombreCategoria: '$nombre', 
                    numHamburguesas: { $size: '$hamburguesas'}
                }
            },
            {
                $sort: { numHamburguesas: -1 } 
            },
            {
                $limit: 1 
            }
        ];

        const result = await categoriasCollection.aggregate(pipeline).toArray();

        if (result.length === 0) {
            return res.status(404).json({ error: 'No se encontraron categorías.' });
        }

        res.json(result[0]);
    } catch (e) {
        res.status(500).json({ error: 'Error interno en el servidor' });
    } finally {
        await client.close();
    }
});


//? -35-Listar todos los chefs y el costo total de ingredientes de todas las hamburguesas que han preparado

router.get('/ejercicio35', async (req, res) => {
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const chefsCollection = db.collection('chefs');

        const pipeline = [
            {
                $lookup: {
                    from: 'hamburguesas', 
                    localField: 'nombre', 
                    foreignField: 'chef', 
                    as: 'hamburguesas' 
                }
            },
            {
                $unwind: '$hamburguesas' 
            },
            {
                $lookup: {
                    from: 'ingredientes', 
                    localField: 'hamburguesas.ingredientes', 
                    foreignField: 'nombre', 
                    as: 'ingredientes' 
                }
            },
            {
                $group: {
                    _id: '$_id', 
                    nombre: { $first: '$nombre' }, 
                    costoTotalIngredientes: { $sum: '$ingredientes.precio' } 
                }
            },
            {
                $sort: { nombre: 1 } 
            }
        ];

        const result = await chefsCollection.aggregate(pipeline).toArray();

        res.json(result);
    } catch (e) {
        res.status(500).json({ error: 'Error interno en el servidor' });
    } finally {
        await client.close();
    }
});


//? -36-Encontrar todos los ingredientes que no están en ninguna hamburguesa

router.get('/ejercicio36', async (req, res) => {
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const ingredientesCollection = db.collection('ingredientes');

        const pipeline = [
            {
                $lookup: {
                    from: 'hamburguesas', 
                    localField: 'nombre', 
                    foreignField: 'ingredientes', 
                    as: 'hamburguesas' 
                }
            },
            {
                $match: {
                    hamburguesas: { $size: 0 } 
                }
            },
            {
                $project: {
                    _id: 0, 
                    nombre: 1 
                }
            },
            {
                $sort: { nombre: 1 } 
            }
        ];

        const result = await ingredientesCollection.aggregate(pipeline).toArray();

        res.json(result);
    } catch (e) {
        res.status(500).json({ error: 'Error interno en el servidor' });
    } finally {
        await client.close();
    }
});


//? -37-Listar todas las hamburguesas con su descripción de categoría

router.get('/ejercicio37', async (req, res) => {
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const hamburguesasCollection = db.collection('hamburguesas');
        const categoriasCollection = db.collection('categorias');

        const pipeline = [
            {
                $lookup: {
                    from: 'categorias', 
                    localField: 'categoria', 
                    foreignField: 'nombre', 
                    as: 'categoriaInfo' 
                }
            },
            {
                $project: {
                    _id: 0, 
                    nombre: 1, 
                    descripcionCategoria: '$categoriaInfo.descripcion' 
                }
            },
            {
                $sort: { nombre: 1 } 
            }
        ];

        const result = await hamburguesasCollection.aggregate(pipeline).toArray();

        res.json(result);
    } catch (e) {
        res.status(500).json({ error: 'Error interno en el servidor' });
    } finally {
        await client.close();
    }
});



//? -38-Encuentra el chef que ha preparado hamburguesas con el mayor número de ingredientes en total

router.get('/ejercicio38', async (req, res) => {
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const chefsCollection = db.collection('chefs');
        const hamburguesasCollection = db.collection('hamburguesas');
        const ingredientesCollection = db.collection('ingredientes');

        const pipeline = [
            {
                $lookup: {
                    from: 'hamburguesas', 
                    localField: 'nombre', 
                    foreignField: 'chef', 
                    as: 'hamburguesas' 
                }
            },
            {
                $unwind: '$hamburguesas' 
            },
            {
                $lookup: {
                    from: 'ingredientes', 
                    localField: 'hamburguesas.ingredientes', 
                    foreignField: 'nombre', 
                    as: 'ingredientes' 
                }
            },
            {
                $group: {
                    _id: '$_id', 
                    nombre: { $first: '$nombre' }, 
                    totalIngredientes: { $sum: { $size: '$ingredientes' } } 
                }
            },
            {
                $sort: { totalIngredientes: -1 } 
            },
            {
                $limit: 1
            }
        ];

        const result = await chefsCollection.aggregate(pipeline).toArray();

        res.json(result);
    } catch (e) {
        res.status(500).json({ error: 'Error interno en el servidor' });
    } finally {
        await client.close();
    }
});


//? -39-Encontrar el precio promedio de las hamburguesas en cada categoría

router.get('/ejercicio39', async (req, res) => {
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const hamburguesasCollection = db.collection('hamburguesas');

        const pipeline = [
            {
                $lookup: {
                    from: 'categorias', 
                    localField: 'categoria', 
                    foreignField: 'nombre', 
                    as: 'categoriaInfo' 
                }
            },
            {
                $group: {
                    _id: '$categoriaInfo.nombre', 
                    precioPromedio: { $avg: '$precio' } 
                }
            },
            {
                $project: {
                    _id: 0, 
                    categoria: '$_id', 
                    precioPromedio: 1 
                }
            }
        ];

        const result = await hamburguesasCollection.aggregate(pipeline).toArray();

        res.json(result);
    } catch (e) {
        res.status(500).json({ error: 'Error interno en el servidor' });
    } finally {
        await client.close();
    }
});


//? -40-Listar los chefs y la hamburguesa más cara que han preparado

router.get('/ejercicio40', async (req, res) => {
    const client = new MongoClient(bases);
    try {
        await client.connect();
        const db = client.db(nombreBase);
        const chefsCollection = db.collection('chefs');
        const hamburguesasCollection = db.collection('hamburguesas');

        const pipeline = [
            {
                $lookup: {
                    from: 'Hamburguesas',
                    localField: 'nombre', 
                    foreignField: 'chef', 
                    as: 'hamburguesas'
                }
            },
            {
                $unwind: '$hamburguesas' 
            },
            {
                $sort: { 'hamburguesas.precio': -1 } 
            },
            {
                $group: {
                    _id: '$_id', 
                    nombre: { $first: '$nombre' }, 
                    hamburguesaMasCara: { $first: '$hamburguesas' } 
                }
            },
            {
                $project: {
                    _id: 0, // 
                    chef: '$nombre', 
                    hamburguesaMasCara: '$hamburguesaMasCara.nombre', 
                    precioHamburguesaMasCara: '$hamburguesaMasCara.precio' 
                }
            }
        ];

        const result = await chefsCollection.aggregate(pipeline).toArray();

        res.json(result);
    } catch (e) {
        res.status(500).json({ error: 'Error interno en el servidor' });
    } finally {
        await client.close();
    }
});


module.exports = router