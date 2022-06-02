const Post = require("../models/posts");
const fs = require('fs');

module.exports = class API{
    // fetch All post
    static async fetchAllPost(req, res){
        try {
            const post = await Post.find();
            res.status(200).json(post);
        } catch (error) {
            res.status(404).json({message:error.message});
        }
    }

    // fetch post by ID
    static async fetchPostById(req, res){
       try {
           const id    = req.params.id;
            const post = await Post.findById(id);
            res.status(200).json(post)
       } catch (error) {
           res.status(404).json({message: error.message});
       }
    }

    // create a post 
    static async createPost(req, res){
        try {
            const post = req.body;
            const imageName = req.file.filename;
            post.image = imageName;
            await Post.create(post);
            res.status(201).json({message: "Post created successfully"});
        } catch (error) {
            res.status(400).json({message: error.message})            
        }
    }

    // update a post 
    static async updatePostById(req, res){
        try {
            const id = req.params.id;
            let new_image = '';
            if(req.file){
                new_image = req.file.filename;
                try {
                    fs.unlinkSync("./uploads/"+ req.body.old_image);
                } catch (error) {
                    console.log(error);
                }
            }else{
                new_image = req.body.old_image;

            }
            const newPost = req.body;
            newPost.image = new_image;

            await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({message: "Post updated successfully"})
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }

    //delete a post
    static async deletePost(req, res){
       try {
           const id = req.params.id;
           const result = await Post.findByIdAndDelete(id);
           if(result.image != ''){
               try {
                   fs.unlinkSync('./uploads/'+result.image);

               } catch (error) {
                   console.log(error);
               }
           }
           res.status(200).json({message: "Post deleted successfully..."});
       } catch (error) {
           res.status(400).json({message: error.message});
       }
    }
    
}