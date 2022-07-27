const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database connected');
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { dbConnection };
