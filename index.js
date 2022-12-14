const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();

// dotenv 
require('dotenv').config();

// middlewares 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server running successfully');
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.akihfew.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        const categoriesCollection = client.db('UsedProductResale').collection('productCategories');
        const productsCollection = client.db('UsedProductResale').collection('products');
        // This collection is for users 
        const usersCollection = client.db('UsedProductResale').collection('users');


        // getting all categories 

        app.get('/productcategories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        })

        // getting product by category 

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id)
            const query = { category_id: id };
            const products = await productsCollection.find(query).toArray();
            res.send(products);
        })


        // adding users to db 

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result)
        })


        // getting all users 

        app.get('/users', async (req, res) => {
            const filter = req.query.role;
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        })

        // add product 

        app.post('/addproduct', async (req, res) => {
            const user = req.body;
            const result = await productsCollection.insertOne(user);
            res.send(result)
        })

        // finding sellers product 

        app.get('/myproducts', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await productsCollection.find(query).toArray();
            res.send(user);


        })

    }
    finally {

    }
}
run().catch(error => console.error(error))



app.listen(port, () => {
    console.log('running from port- ', port);
})

