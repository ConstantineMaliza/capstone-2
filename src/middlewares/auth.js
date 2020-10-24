import passport from 'passport';
import asyncHandler from './async';

export const auth = asyncHandler(async(req, res, next) => { 
    passport.authenticate('jwt', {session:false}, (err, user, info) =>{
        if(err || !user) return next(info);
        req.user = user;
        return next();
    })(req, res, next);
});


export const isAdmin = asyncHandler(async (req, res, next) => {
    const { user } = req;
    console.log(user);
    if (user.role !== 'Admin')
      return next({ message: 'Forbidden resources!', statusCode: 403 });
    return next();
  });

  export const isUser = asyncHandler(async(req, res, next)=>{
    const { user } = req;
    console.log(user);
    if (user.role !== 'Admin' || user.role !== 'Guest')
      return next({ message: 'Forbidden resources!', statusCode: 403 });
    return next();
  });