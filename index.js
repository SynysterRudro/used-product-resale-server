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

    }
    finally {

    }
}
run().catch(error => console.error(error))



app.listen(port, () => {
    console.log('running from port- ', port);
})

