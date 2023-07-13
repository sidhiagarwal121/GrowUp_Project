const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    new_password:{
        type:String,
        required:true,
    }
})
const Users=new mongoose.model("users",UserSchema);
module.exports=Users;