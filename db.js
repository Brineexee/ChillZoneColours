const { MongoClient } = require('mongodb');
const uri = process.env.MONGODBKEY;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let cachedDb = null;

exports.getDatabase = async function () {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    const db = client.db('CZUsersDatabase');
    cachedDb = db;
    return db;
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas', err);
    process.exit(1);
  }
}

// Helper function to insert a document into a collection
exports.insertOne = async function (collectionName, document) {
  const db = await exports.getDatabase();
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(document);
  return "New entry in database!";
}

// Helper function to find documents in a collection
exports.find = async function (collectionName, filter = {}) {
  const db = await exports.getDatabase(); 
  const collection = db.collection(collectionName);

  console.log("Filters: " + JSON.stringify(filter));
  
  const cursor = await collection.find(filter);
  const documents = await cursor.toArray();
  console.log(documents);
  return documents;
}

exports.update = async function (collectionName, user, update) {
  const db = await exports.getDatabase();
  const collection = db.collection(collectionName);
  const result = await collection.updateOne({ id: user.id }, { $set: update });
  return "Updated entry in database!";
}