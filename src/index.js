import app from '../src/app'
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`App is currently on port ${PORT}`);
});


