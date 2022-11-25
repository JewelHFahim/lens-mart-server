const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.LM_USER}:${process.env.LM_PASSWORD}@cluster0.qez1k8e.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    const userCollection = client.db("lensMart").collection("users");
    const categoriesCollection = client.db("lensMart").collection("categories");
    const camerasCollection = client.db("lensMart").collection("cameras");
    const lensCollection = client.db("lensMart").collection("lens");
    const accessoriesCollection = client.db("lensMart").collection("accessories");
    try{
        // USers
        app.post('/users', async(req, res)=>{
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result)
        })

        app.get('/users', async(req, res)=>{
            const query = {};
            const users = await userCollection.find(query).toArray();
            res.send(users);
        })
        // Users End

        // Category
        app.get('/categories',async (req, res)=>{
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        });
        app.get('/cameras', async(req, res)=>{
            const query = {};
            const cameras = await camerasCollection.find(query).toArray();
            res.send(cameras);
        });
    
        app.get('/cameras/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await camerasCollection.findOne(query);
            res.send(result);
        })



        app.get('/lens', async(req, res)=>{
            const query = {};
            const lens = await lensCollection.find(query).toArray();
            res.send(lens);
        });
        app.get('/lens/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await lensCollection.findOne(query);
            res.send(result);
        })



        app.get('/accessories', async(req, res)=>{
            const query = {};
            const accessories = await accessoriesCollection.find(query).toArray();
            res.send(accessories);
        })
        app.get('/accessories/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await accessoriesCollection.findOne(query);
            res.send(result);
        })

        // Category end
    }
    finally{

    }
}
run().catch(error=>console.log(error))


app.get('/', (req, res)=>{
    res.send('LensMart server working...!!')
})

app.listen(port, (req, res)=>{
    console.log('LensMart-', port);
})