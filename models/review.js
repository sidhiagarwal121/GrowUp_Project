const mongoose=require('mongoose')
const reviewSchema=new mongoose.Schema({
    author:{type:String},
    review:{type:String}
})
const Review=new mongoose.model("Review",reviewSchema);
module.exports=Review;