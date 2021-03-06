import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already used!'],
      required: [true, 'Please provide an email!'],
    },
    password: String,
    image: {
      type: String,
      default:
        'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
    },
    imageId: String,
    role: {
      type: String,
      default: 'Guest',
      required: [true, 'Please provide a user role'],
    },
    name: {
      type: String,
      required: [true, 'Please provide a user name'],
      unique: false,
    },
  },
  { timestamps: true }
);

export default model('User', UserSchema);
