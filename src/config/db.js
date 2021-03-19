const mongoose = require('mongoose');

// Connect to DB
module.exports = mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));
