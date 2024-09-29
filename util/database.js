const mongodb = require("mongodb");
const mongodbClient = mongodb.MongoClient;
require("dotenv").config();

let _db;

const mongoConnect = (callBack) => {
  mongodbClient
    .connect(process.env.MONGODB_URL)
    .then((client) => {
      console.log("Mongodb Connected!");
      _db = client.db();
      callBack();
    })
    .catch((err) => console.log(err));
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  // throw "No Database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
