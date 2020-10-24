import {Schema, model} from 'mongoose';

const QuerySchema = new Schema (
    {
        email:{
            type:String,
            required: true,
        },
        name : {
            type:String,
            required:true,
        },
        body:{
            type:String,
            required: true,
        },
    },
    { timestamps:true}
);

export default model('Query', QuerySchema);