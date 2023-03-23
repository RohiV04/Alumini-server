const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    cart:[],
    orders:[],
    
},
    {
        timestamps:true
})

const User=mongoose.model('User',userSchema);
module.exports=User;