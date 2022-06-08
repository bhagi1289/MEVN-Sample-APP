const express = require('express');
const router = express.Router();
const multer = require('multer');
const API = require("../controllers/api");

// multer middleware
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads', )
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    }
})

let upload = multer({
    storage: storage,

}).single('image');


router.get("/post", API.fetchAllPost);

router.get("/post/:id", API.fetchPostById);

router.post("/post", upload, API.createPost);

router.patch("/post/:id", upload, API.updatePostById);

router.delete("/post/:id", API.deletePost);
module.exports = router;