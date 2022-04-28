const mongoose = require("mongoose");

module.exports = function connectDB() {
  mongoose.connect(process.env.DB);

  mongoose.connection.once("open", () => {
    console.log("connected to database");
  });

  mongoose.connection.on("error", console.error);
};
