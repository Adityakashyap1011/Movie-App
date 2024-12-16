const fs=require("fs");
const path=require("path");


const UsersPath=path.join(__dirname,"user.json")

function getUser(){
    const data=fs.readFileSync(UsersPath,"utf-8");
    return JSON.parse(data);
}

function setUser(data) {
    try {
        fs.writeFileSync(UsersPath, JSON.stringify(data, null, 2));
        console.log("User data successfully written to file");
    } catch (error) {
        console.error("Error writing user data to file:", error);
    }
}


module.exports={getUser,setUser}