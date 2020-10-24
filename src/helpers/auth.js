import "@babel/polyfill";
import { config } from 'dotenv';
import { genSalt, hash as _hash, compare, hash } from 'bcrypt';
import {sign , verify} from 'jsonwebtoken';

config();
const { JWT_SECRET } = process.env;

export const encryptPassword = async (password) => {
    const salt = await genSalt(12);
    const hash = await _hash(password, salt);
    if (!hash) return false;
    return hash;
  };

  export const decryptPassword = async(password, hash) =>{
    const isValid = await compare(password, hash);

    if (!isValid) return false;
    return isValid;
  };

  export const signToken = (
    {
      email ,
      _id:userId,
       name,
       role,
    },
    secret = JWT_SECRET,
    duration = null
    
    )=>{
      const tokeOptions = duration ? {expiresIn : duration}: undefined;
      const token = sign(
        {
          email,
          userId,
          name,
          role
        },
        secret,
        tokeOptions
      );
      return token;
    };

export const verifyToken = (token, secret=JWT_SECRET) =>{
  const decoded = verify(token, secret);
  return decoded;
}