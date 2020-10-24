import cloudinary from '../config/cloudinary';
import asyncHandler from './async';
import Response from '../utils';

export const uploadImage = asyncHandler(async (req, res, next)=>{
    if(!req.files) return next();
    const {tempFilePath} = req.files.image;
    const {url, public_id:pid} = await cloudinary.upload(tempFilePath);

    req.image = url;
    req.imageId = pid;
    return next();

});

export const deleteImage = async (res, id) =>{
    try{
        const { result } = await cloudinary.deleteImage(id);
        if(result !== 'ok') Response.error(res, 500, 'Unable to delete Image');

    }catch(error){
        Response.error(res, 503, 'unable to that delete image', error);
    }
};