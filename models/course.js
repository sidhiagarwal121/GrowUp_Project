const mongoose=require('mongoose')
const courseSchema=new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    detail:{type:String},
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }]
    
})

const Courses=new mongoose.model("Course",courseSchema);
module.exports=Courses;