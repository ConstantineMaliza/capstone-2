import { userValidate, validate } from '../validation';
import UserModel from '../models/User';
import {encryptPassword, signToken, decryptPassword}  from '../helpers/auth';
import asyncHandler  from '../middlewares/async';
import Response from '../utils';


export const signup = asyncHandler(async (req, res) => {

  const { image, imageId } = req;
  const { name, email, password } = req.body;

    const userEmail = await UserModel.findOne({email});


    if (userEmail) return res.status(400).json({error: 'Email in use'});

  const data = {  name, email, password, image, imageId };

  const { details: errors } = validate(userValidate.CreateSchema, data);
  if (errors)
    return Response.error(
      res,
      400,
      `Please provide ${errors[0].context.key}`,
      errors[0]
    );

  const hash = await encryptPassword(data.password);
  const user = await UserModel.create({ ...data, password: hash });
  if (!user) return Response.error(res, 500, 'User not created!');


  return Response.success(res, 201, signToken(user),user);
  
  
});

export const login = asyncHandler(async(req,res)=>{

  const {details: errors} = validate(userValidate.LoginSchema, req.body);
  if(errors)
    return Response.error(res, 400, `Please provide ${errors[0].context.key}`,errors[0]);

  const {email, password} = req.body;
  const user = await UserModel.findOne({email});
  if(!user) return Response.error(res, 404, 'wrong Credentials' );
  if(!(await decryptPassword (password, user.password)))
    return Response.error(res, 401, 'wrong password');

  const token = signToken(user);
  return Response.success(res, 200,user, token, 'Successfully Login in!');
});


export const profile = asyncHandler(async (req, res) => {
  const error = validate(userValidate.UpdateSchema, req.body);
  if (error) return Response.error(res, 400, error.details[0].message, error);

  const { image, imageId } = req;
  const data = { ...req.body, image, imageId };
  const hash = await encryptPassword(data.password);
  const user = await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    {...data, password: hash},
    { new: true, runValidators: true }
  );

  if (!user) return Response.error(res, 404, 'User not found!');

  return Response.success(res, 200, user);
});


export const getAll = asyncHandler(async(req,res) =>{

  const users = await UserModel.find();
  Response.success(res, 200, {count: users.length, users}, 'Successfully retrieved');

});


