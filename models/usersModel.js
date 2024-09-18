const mongoose = require('mongoose');
const userSchema = new  mongoose.Schema({
    name: {
      type: String,
      required:[true,'name is manadotry']
    },
    email:{
        type:String,
        required:[true,'email is manadotry']
    },
    password:{
        type:String,
        required:[true,'password is manadotry']

    },
    isAdmin:{
      type:Boolean,
      default:false
    }
  },
  {timestamps:true});

module.exports=mongoose.model('users',userSchema)