const mongoose=require('mongoose')
const cartSchema=new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true}
    
})
const Cart=new mongoose.model("Cart",cartSchema);
module.exports=Cart;
