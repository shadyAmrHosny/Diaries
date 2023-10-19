const Post=require('./../models/postModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const appError= require('./../utils/AppError');

exports.creatPost=catchAsync(async (req,res)=>{
        console.log(req.body)
        const newPost = await Post.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                post: newPost
            }
        })
});
exports.getAllPosts=catchAsync(async(req,res,next)=> {
        // EXECUTE QUERY
        const features = new APIFeatures(Post.find(), req.query)
            .sort()
            .limitFields()
            .paginate();
        const posts = await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            data: {
                posts
            }
        });
});
exports.getPost=catchAsync(async(req,res,next)=>{
        const post=await Post.findById(req.params.id)
        if (!post){
            return next(new appError('NO POST  FOUND WITH THAT ID',404));
        }
        res.status(200).json({
            status: 'success',
            data: {
               post
            }
        });
})

exports.updatePost=catchAsync( async (req,res,next)=>{
        const modifiedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!modifiedPost){
            return next(new appError('NO POST  FOUND WITH THAT ID',404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                modifiedPost
            }
        });
});

exports.deletePost=catchAsync(async (req,res,next)=>{
        const post= await Post.findByIdAndDelete(req.params.id);
        if (!post){
            return next(new appError('NO POST  FOUND WITH THAT ID',404));
         }
        res.status(204).json({
            status: 'success',
            data: null
        });

});