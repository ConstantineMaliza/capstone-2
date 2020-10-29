require('dotenv').config();

const env = process.env.NODE_ENV  || 'development';

const development = {
    app:{
        port: process.env.PORT,
        secret_key:process.env.SECRET_KEY
    },
    database:{
        mongourl:process.env.MONGO_URI

    }

};
const production = {
    app:{
        port: process.env.PORT,
        secret_key:process.env.SECRET_KEY
    },
    database:{
        mongourl:process.env.MONGO_URI

    }

};

const test = {
    app:{
        port: process.env.PORT,
        secret_key:process.env.SECRET_KEY
    },
    database:{
        mongourl:process.env.MONGO_URI_TEST

    }
}

const config = {
    development,
    production,
    test
}
module.exports = config[env];


