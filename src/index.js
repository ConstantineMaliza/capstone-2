
import '@babel/polyfill';
import express, { json, urlencoded } from 'express';
import connectDB from './config/database';
import dotenv from 'dotenv';
import passport from 'passport'; 
import routes from './routes';
import {jwtStrategy} from './config/passport';
import uploader from 'express-fileupload';



connectDB()

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(uploader({ useTempFiles: true }));
app.use(routes);
app.use(passport.initialize());
passport.use(jwtStrategy);


app.get('/', (req, res) => {
    res.end("hello world");
})



app.listen(PORT, () => {
    console.log(`App is currently on port ${PORT}`);
});

export default app;
