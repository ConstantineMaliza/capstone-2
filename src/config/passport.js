import { config } from 'dotenv';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

config();

const JWToptions = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

export const jwtStrategy = new JwtStrategy (JWToptions, (payload, done)=>{
    return payload ? done(null, payload): done({message: 'unauthenticated'});
});