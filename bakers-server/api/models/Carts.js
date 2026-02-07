const mongoose=require('mongoose');
const {Schema}=mongoose;

//create schema object for menu items

const cartSchema=new Schema({
    menuItemId:String,
name:{
    type:String,
    trim:true,
    required:true,
    minlength:3
},
recipe:String,
image:String,
quantity:Number,
price:Number,
email:{
    type:String,
    trim:true,
    required:true,
}
})

//create model

const Carts=mongoose.model("Cart",cartSchema);

module.exports=Carts;
