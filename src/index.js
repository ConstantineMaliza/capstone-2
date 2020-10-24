
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/conFusion');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we are connected!");
});

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.end("hello world");
})



app.listen(PORT, () => {
    console.log(`App is currently on port ${PORT}`);
});

