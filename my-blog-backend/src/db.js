let db;
import { MongoClient } from "mongodb";
async function connectToDB(cb) {
  const client = new MongoClient(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.byiqzub.mongodb.net/?retryWrites=true&w=majority`
  );
  await client.connect();

  db = client.db("react-blog-db");
  cb();
}
export { db, connectToDB };
