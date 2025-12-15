const mongoose = require("mongoose");

require("dotenv").config();
mongoose.connect(`mongodb+srv://${process.env.mongoURI}`);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB database");
});

db.on("error", ()=>{
    console.log("Error connecting to MongoDB database");
});

module.exports = db;
