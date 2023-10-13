const Post=require('./../models/postModel')
const APIFeatures = require('./../utils/apiFeatures');

exports.creatPost=async (req,res)=>{
    try {
        console.log(req.body)
        const newPost = await Post.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                post: newPost
            }
        })
    }catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}
exports.getAllPosts=async(req,res)=>{
    try {
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
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
exports.getPost=async (req,res)=>{
        try {
            const post=await Post.findById(req.params.id);
            res.status(200).json({
                status :'success',
                data :{
                    post
                }
            })
        }catch (err){
            res.status(400).json({
                status: 'fail',
                message: err
            });
        }
}
exports.updatePost= async (req,res)=>{
        try {
            const modifiedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            res.status(200).json({
                status: 'success',
                data: {
                    modifiedPost
                }
            });
        }catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
}
exports.deletePost=async (req,res)=>{
        try {
            await Post.findByIdAndDelete(req.params.id);
            res.status(204).json({
                status: 'success',
                data: null
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
};

}