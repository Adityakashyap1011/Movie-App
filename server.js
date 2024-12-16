const express=require("express");
const port=3000;
const app=express();
const apiPath=require("./api")


app.use("/",apiPath)


app.listen(port,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT ${`http://localhost:3000/`}`)
})