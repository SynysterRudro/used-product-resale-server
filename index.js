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


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.akihfew.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

    }
    finally {

    }
}
run().catch(error => console.error(error))



app.listen(port, () => {
    console.log('running from port- ', port);
})

