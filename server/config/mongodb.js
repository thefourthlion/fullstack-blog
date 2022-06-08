const mongoose = require("mongoose");

const connectBD = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("mongoDB 📶✅");
};

module.exports = connectBD;
