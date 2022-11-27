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
    const ordersCollection = client.db("lensMart").collection("orders");


    try{

        // Users
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
        app.get('/users/:id', async(req, res)=>{
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.findOne(query);
            res.send(result)
        })
        app.delete('/users/:id', async(req, res)=>{
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result)
        })
        



        // Admin
        app.get('/users/admin/:email', async(req, res)=>{
            const email = req.params.email;
            const query = { email };
            const user = await userCollection.findOne(query);
            res.send({ isAdmin: user?.role === 'admin'});
          })
        app.put('/users/admin/:id', async(req, res)=>{
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = { upert: true };
            const updatedDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc, options);
            res.send(result)
        })
        // Seller
        app.get('/users/seller/:email', async(req, res)=>{
            const email = req.params.email;
            const query = { email };
            const user = await userCollection.findOne(query);
            res.send({ isAdmin: user?.role === 'Seller'});
          })
        //   Buyer
        app.get('/users/buyer/:email', async(req, res)=>{
            const email = req.params.email;
            const query = { email };
            const user = await userCollection.findOne(query);
            res.send({ isAdmin: user?.role === 'Buyer'});
          })



        // Category
        app.get('/categories',async (req, res)=>{
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        });



        // Camera
        app.get('/cameras', async(req, res)=>{
            const query = {};
            const cameras = await camerasCollection.find(query).toArray();
            res.send(cameras);
        });
        app.post('/cameras', async(req, res)=>{
            const products = req.body;
            const product = {
                products,
                date: new Date().toISOString().substring(0, 10)
            }
            const result = await camerasCollection.insertOne(product);
            res.send(result);
        });
        app.get('/cameras/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await camerasCollection.findOne(query);
            res.send(result);
        })



        // Lens
        app.get('/lens', async(req, res)=>{
            const query = {};
            const lens = await lensCollection.find(query).toArray();
            res.send(lens);
        });
        app.post('/lens', async(req, res)=>{
            const products = req.body;
            const product = {
                products,
                date: new Date().toISOString().substring(0, 10)
            }
            const result = await lensCollection.insertOne(product);
            res.send(result);
        });
        app.get('/lens/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await lensCollection.findOne(query);
            res.send(result);
        })




        // Accessories
        app.get('/accessories', async(req, res)=>{
            const query = {};
            const accessories = await accessoriesCollection.find(query).toArray();
            res.send(accessories);
        });
        app.post('/accessories', async(req, res)=>{
            const products = req.body;
            const product = {
                products,
                date: new Date().toISOString().substring(0, 10)
            }
            const result = await accessoriesCollection.insertOne(product);
            res.send(result);
        });
        app.get('/accessories/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await accessoriesCollection.findOne(query);
            res.send(result);
        })
        // Category end




        // order
        app.post('/orders', async(req, res)=>{
            const orders = req.body;
            const result = await ordersCollection.insertOne(orders);
            res.send(result)
        })
        app.get('/orders', async(req, res)=>{
            const email = req.query.email;
            if(email){
                const query = { email: email };
                const result = await ordersCollection.find(query).toArray();
                res.send(result);
                return;
            }
            else{
                const query = {};
                const result = await ordersCollection.find(query).toArray();
                res.send(result);
            }
        })
        app.get('/orders', async(req, res)=>{
            const query = { };
            const result = await ordersCollection.find(query).toArray();
            res.send(result);
        })
        
     
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