import '@babel/polyfill';
import express, { json, urlencoded } from 'express';
import connectDB from './config/database';
import passport from 'passport'; 
import routes from './routes';
import {jwtStrategy} from './config/passport';
import uploader from 'express-fileupload';

connectDB()

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
export default app;