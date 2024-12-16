const express=require("express");
const router=express.Router();
const path=require("path");
const bodyParser = require("body-parser");
const {getUser ,setUser} = require("./function");
const bcrypt=require("bcrypt");
const axios=require("axios");
const jwt=require("jsonwebtoken");

const apiKey = "a1f5c4a6";
const secretKey="111000";



router.use(bodyParser.urlencoded({ extended: true }));

router.get("/",(req,res)=>{
    return res.sendFile(path.join(__dirname,"index.html"));
})

router.post("/submit",async (req,res)=>{
    try{
        const {username,password,email}=req.body;
        console.log(req.body);
        const users=await getUser();
        if(users.find((user)=> user.username==username)){
            return res.send("User already exists")
        }
        const newPassword=await bcrypt.hash(password,10);
        users.push({username: username, password: newPassword, email: email});
        setUser(users);
        res.sendFile(path.join(__dirname,"index2.html"));
    }  
    catch(error){
        console.log("Error");
    }
});

router.get('/search', async (req,res)=>{
    const name=req.query.name;
    console.log(name);
    try{
        const response=await axios.get(`http://www.omdbapi.com/`,{
            params:{
                apikey :apiKey,
                s: name
            }
        })
        return res.json(response.data);
    }catch(e){
        console.log("Some Error Occured");
    }
})

router.get('/login',(req,res)=>{
    return res.redirect('/page');
})
router.get('/page',(req,res)=>{
    return res.sendFile(path.join(__dirname,"index3.html"));
})

router.post("/check",async (req,res)=>{
    const {username,password}=req.body;
    const users=await getUser();
    
    const User=users.find((user)=> user.username==username);
    if(!User || !(await bcrypt.compare(password,User.password))){
        return res.json("INVALID USER CREDENTIALS..")
    }

    const token=jwt.sign({username},secretKey,{expiresIn: "3600s"})
    console.log(token);
    res.sendFile(path.join(__dirname,"index2.html"));


})

module.exports=router;