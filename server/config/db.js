const mongoose = require("mongoose");
require("dotenv").config();
const URI = `mongodb+srv://${process.env.mongoUser}:${process.env.pwd}@cluster0.i7od8.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
