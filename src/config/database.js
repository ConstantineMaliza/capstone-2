import { config } from 'dotenv';
import { connect } from 'mongoose';

config();

const connectDB = async () => {
  try {
    const { MONGO_URI, MONGO_URI_TEST,  NODE_ENV } = process.env;
    const conn = await connect(
      NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );

    console.log(
      `Database Connected: ${conn.connection.host} in ${NODE_ENV} mode`
    );
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

export default connectDB;