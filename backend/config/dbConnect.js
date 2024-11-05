const mongoose = require("mongoose");

async function dbConnect() {
  // console.log(process.env.MONGO_URI)
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to mongodb database ${mongoose.connection.name}`);
  } catch (error) {
    console.log(`Error in mongoDB ${error}`);
  }
}
dbConnect();
