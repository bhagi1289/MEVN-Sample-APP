// import
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("uploads"))


//DB connections
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("DB Connected")).catch(err=>console.log(err));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname+"/dist"));
    app.get('*', (req, res)=>{
        res.sendFile(__dirname+"/dist/index.html")
    })
}
//routes prefix
app.use("/api", require("../server/routes/routes"));

//start server
app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}/`);
})