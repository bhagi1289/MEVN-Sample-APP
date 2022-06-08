import axios from "axios";
const url = "/api/post"


export default class API{
    // Get All all post from server

    static async getAllPosts(){
        // eslint-disable-next-line
        const res = await axios.get(url);
        return res.data;
    }
    static async getPostById(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    } 
    static async addPost(post){
        const res = await axios.post(url,post);
        return res.data;
    }  
    static async updatePost(id, post){
        const res = await axios.patch(`${url}/${id}`, post);
        return res.data;
    }  

    static async deletePost(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }  
}