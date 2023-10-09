import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();


const variable = process.env.MONGO_CONN_STRING
console.log(variable);

const client= new MongoClient(variable);

let conn;
try {
  conn = await client.connect();
  console.log("connected to  apdspart2");
} catch(e) {
  console.error(e);
}

let db = conn.db("apdspart2");

export default db;


