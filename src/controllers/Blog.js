import {
    blogValidate,
    validate,
  } from '../validation';
import asyncHandler from '../middlewares/async';
import BlogModel from '../models/Blog';
import Response from '../utils';

export const getAll = asyncHandler(async(req, res)=>{
    const blogs = await BlogModel.find();
    if(!blogs) return Response.error(res, 404, 'No blog was found!');

    return Response.success(
        res,
        200,
        {count:blogs.length, blogs},
        'Successfully retrieved'
    );
});

export const getOne = asyncHandler(async(req, res) =>{
    const {blogId} = req.params;
    if(!blogId)
    return Response.error(
        res,
        400,
        'Please provide an id for the blog'
    );
    const {_doc:blog} = await BlogModel.findById(blogId)
  
        // .populate('comments')
    if(!blog)return Response.error(res, 404, 'Blog not found!');

    return Response.success(
        res,
        200,
        {...blog},
    );

});



export const create = asyncHandler (async (req, res) =>{
    const {
        image,
        imageId,
    } = req;
    const post = {...req.body, image, imageId};

    const { details: errors } = validate(blogValidate.CreateSchema, post);
  if (errors) return Response.error(res, 400, errors[0].message, errors[0]);


    const {_doc:blog} = await BlogModel.create(post);
    if (!blog) return Response.error(res, 404, 'Blog not created!');

    return Response.success(res, 201, blog, 'Blog Created successfully');
});

export const update = asyncHandler(async (req, res)=>{
    const {blogId}= req.params;

    const { details: errors } = validate(blogValidate.UpdateSchema, req.body);
    if (errors) return Response.error(res, 400, errors[0].message, errors[0]);
  

    const blog = await BlogModel.findOneAndUpdate(
        {
            _id:blogId
        },
        req.body,
        {
            new:true
        }    
    );
    if(!blog) return Response.error(
        res,
        404,
        'Blog not found'
    );
    return Response.success(res,200,blog, 'Blog Updated successfully');
});

export const deleteOne = asyncHandler(async (req, res)=>{
    const {blogId} = req.params;

    const blog = await BlogModel.findOne({_id:blogId});

    if(!blog) return Response.error(res, 404, blog.imageId);
    

    if (blog.imageid) await deleteImage(res, blog.imageId);
        
    await blog.deleteOne();
    return Response.success(res, 200, blog, 'Blog deletd successfully');
});


