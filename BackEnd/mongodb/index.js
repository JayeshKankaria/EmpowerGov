const {MongoClient}=require('mongodb');
const url='mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const database='Hack'

async function getData()
{
    let result=await client.connect();
    let db = result.db('Hack');
    let collection = db.collection('Customer1');
    let response= await collection.find({}).toArray();
    console.log(response);
}
getData();