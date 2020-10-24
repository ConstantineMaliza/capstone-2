import {Schema , model} from 'mongoose';

const CommentSchema = new Schema(
    {
        body:{
            type:String,
            required:[true, 'Please provide a comment body'],
        },
        author:{
            type:Schema.Types.ObjectId,
            ref: 'User',
            required:true
        }
    },
    {timestamps:true}
);
export default model ('Comment', CommentSchema);