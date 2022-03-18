import mongoose from 'mongoose'
import config from './config.js';
import * as tokenController from './routes/token/token.controller.js'

let db;

(async () => {
  const mongooseOptions = {
    user: config.MONGO_USER,
    pass: config.MONGO_PASS
  }
  db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`);

  /*if(config.ENV === "DEV") {
    db.connection.dropDatabase().then(() => {
      console.warn("⚠️  DEV Environment. Database has been dropped. ⚠️")
    });
  }*/

  await tokenController.getToken();

  console.log('Database is connected to: ', db.connection.name);
})()

export async function closeConnection() {
  await db.connection.close();
}