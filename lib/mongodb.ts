import { MongoClient } from "mongodb";

const options = {};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }
  return uri;
}

function getClientPromise() {
  if (!globalThis._mongoClientPromise) {
    const client = new MongoClient(getMongoUri(), options);
    globalThis._mongoClientPromise = client.connect();
  }
  return globalThis._mongoClientPromise;
}

export async function getDB() {
  const mongoClient = await getClientPromise();
  return mongoClient.db();
}
