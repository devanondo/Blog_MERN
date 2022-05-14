const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(`${process.env.MONGO_SERVER}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) =>
      console.log(`Connection success to ${data.connection.host}`)
    );
};

module.exports = connectDatabase;
