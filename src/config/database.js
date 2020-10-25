import config from '../../config/config';
import { connect } from 'mongoose';


const MONGO_URI = config.database.mongourl;
const connectDB = async () => {
  try {
   
    const conn = await connect(
     MONGO_URI,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );

    console.log(
      `Database Connected`
    );
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

export default connectDB;